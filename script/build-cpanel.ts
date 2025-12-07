import { build as viteBuild } from "vite";
import { rm, mkdir, writeFile, readdir, copyFile, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Build específico para cPanel - gera arquivos estáticos prontos para upload
 */
async function buildForCpanel() {
  console.log("🏗️  Building for cPanel deployment...\n");

  // Limpar diretórios anteriores
  const buildDir = path.resolve(process.cwd(), "reachbuild");
  if (existsSync(buildDir)) {
    console.log("🗑️  Cleaning previous build directory...");
    await rm(buildDir, { recursive: true, force: true });
  }

  // Criar diretório reachbuild
  await mkdir(buildDir, { recursive: true });

  console.log("📦 Building client (Vite)...");
  // Build do cliente - isso já coloca os arquivos em dist/public
  await viteBuild();

  // Copiar arquivos de dist/public para build
  const distPublicPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!existsSync(distPublicPath)) {
    throw new Error(`Build directory not found: ${distPublicPath}`);
  }

  console.log("📋 Copying files to build directory...");
  
  // Função auxiliar para copiar recursivamente
  async function copyRecursive(src: string, dest: string) {
    const stats = await stat(src);
    
    if (stats.isDirectory()) {
      await mkdir(dest, { recursive: true });
      const entries = await readdir(src, { withFileTypes: true });
      
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
          await copyRecursive(srcPath, destPath);
        } else {
          await copyFile(srcPath, destPath);
        }
      }
    } else {
      await copyFile(src, dest);
    }
  }
  
  // Copiar todos os arquivos de dist/public para build
  const files = await readdir(distPublicPath, { withFileTypes: true });
  
  for (const file of files) {
    const sourcePath = path.join(distPublicPath, file.name);
    const destPath = path.join(buildDir, file.name);
    await copyRecursive(sourcePath, destPath);
  }

  // Criar arquivo .htaccess para SPA routing no cPanel
  // Versão simplificada e compatível para evitar erro 403
  console.log("⚙️  Creating .htaccess file for SPA routing...");
  const htaccessContent = `# REACH Performance Marketing - cPanel Configuration
# SPA Routing - Redirect all requests to index.html

DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite files or directories that exist
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>
`;

  const htaccessPath = path.join(buildDir, ".htaccess");
  await writeFile(htaccessPath, htaccessContent, "utf-8");

  // Criar arquivo README com instruções
  console.log("📝 Creating README with deployment instructions...");
  const readmeContent = `# REACH Performance Marketing - Build para cPanel

Este diretório contém todos os arquivos necessários para fazer upload no cPanel.

## 📋 Instruções de Deploy

### Opção 1: Upload via File Manager do cPanel

1. Acesse o **File Manager** no seu cPanel
2. Navegue até o diretório público do seu domínio (geralmente \`public_html\` ou \`www\`)
3. Faça upload de TODOS os arquivos desta pasta \`reachbuild\`
4. Certifique-se de que o arquivo \`.htaccess\` foi enviado (arquivos ocultos podem precisar ser visualizados)
5. **IMPORTANTE:** Após o upload, configure as permissões:
   - Arquivos: 644
   - Diretórios: 755
   - .htaccess: 644

### Opção 2: Upload via FTP

1. Conecte-se ao seu servidor via FTP usando as credenciais do cPanel
2. Navegue até o diretório público (geralmente \`public_html\`)
3. Faça upload de TODOS os arquivos da pasta \`reachbuild\`
4. Certifique-se de que o modo de transferência está configurado como BINARY para arquivos de imagem
5. Configure as permissões:
   - Arquivos: 644
   - Diretórios: 755
   - .htaccess: 644

### ✅ Verificação Pós-Deploy

Após o upload, verifique:

- [ ] Site carrega corretamente
- [ ] Rotas do SPA funcionam (teste navegando para uma rota diferente de /)
- [ ] Arquivos CSS e JS estão carregando
- [ ] Imagens estão aparecendo
- [ ] Arquivo .htaccess está presente e funcionando

### 🔧 Configurações Adicionais (Opcional)

- Se quiser forçar HTTPS, descomente as linhas no .htaccess relacionadas a HTTPS
- Se precisar configurar um domínio específico, ajuste as regras de RewriteBase no .htaccess

## 📦 Estrutura dos Arquivos

\`\`\`
reachbuild/
├── index.html          # Página principal
├── .htaccess          # Configurações do Apache
├── assets/            # CSS, JS e outros assets
│   ├── *.css
│   └── *.js
├── favicon.png        # Favicon
├── logo.png           # Logo
└── opengraph.jpg      # Imagem Open Graph
\`\`\`

## 🐛 Troubleshooting

### Erro 403 (Forbidden)
- Verifique as permissões dos arquivos (arquivos: 644, diretórios: 755)
- Confirme que o .htaccess está presente e tem permissão 644
- Verifique se o mod_rewrite está habilitado no Apache (geralmente já está no cPanel)
- Tente remover temporariamente o .htaccess para testar se é ele que causa o problema

### Site não carrega
- Verifique se todos os arquivos foram enviados
- Confirme que o .htaccess está presente
- Verifique os logs de erro do cPanel (Error Log no cPanel)

### Rotas não funcionam
- Certifique-se de que o mod_rewrite está habilitado no Apache
- Verifique se o .htaccess está sendo lido
- Teste se o RewriteBase está correto (pode precisar ser ajustado dependendo do subdiretório)

### Arquivos não carregam
- Verifique as permissões dos arquivos (644 para arquivos, 755 para diretórios)
- Confirme que os caminhos dos assets estão corretos
- Verifique os logs de erro do cPanel

---

**Build gerado em:** ${new Date().toLocaleString('pt-BR')}
`;

  const readmePath = path.join(buildDir, "README-DEPLOY.md");
  await writeFile(readmePath, readmeContent, "utf-8");

  // Criar arquivo com instruções de permissões
  console.log("📋 Creating permissions instructions file...");
  const permissionsContent = `# INSTRUÇÕES DE PERMISSÕES - cPanel

## ⚠️ IMPORTANTE: Configurar Permissões Após Upload

Após fazer upload dos arquivos para o cPanel, configure as permissões corretas para evitar erro 403:

### Via File Manager do cPanel:

1. Acesse o **File Manager** no cPanel
2. Navegue até o diretório onde fez o upload (ex: public_html)
3. Selecione TODOS os arquivos e pastas
4. Clique com botão direito → "Change Permissions"
5. Configure:
   - **Arquivos** (index.html, .htaccess, *.css, *.js, *.png, etc.): **644**
   - **Diretórios** (assets/, etc.): **755**

### Via Terminal/FTP:

\`\`\`bash
# Navegar até o diretório
cd public_html

# Permissões para arquivos (644)
find . -type f -exec chmod 644 {} \\;

# Permissões para diretórios (755)
find . -type d -exec chmod 755 {} \\;

# Especial: garantir que .htaccess tenha permissão correta
chmod 644 .htaccess
\`\`\`

### Verificação:

Após configurar as permissões, verifique:
- ✅ Arquivos têm permissão 644 (rw-r--r--)
- ✅ Diretórios têm permissão 755 (rwxr-xr-x)
- ✅ .htaccess tem permissão 644
- ✅ Site carrega sem erro 403

## 🐛 Se Ainda Tiver Erro 403:

1. Verifique os logs de erro do cPanel (Error Log)
2. Tente remover temporariamente o .htaccess para testar
3. Verifique se o mod_rewrite está habilitado (geralmente já está no cPanel)
4. Entre em contato com o suporte da hospedagem se o problema persistir

---

**Arquivo gerado em:** ${new Date().toLocaleString('pt-BR')}
`;
  const permissionsPath = path.join(buildDir, "PERMISSOES.txt");
  await writeFile(permissionsPath, permissionsContent, "utf-8");

  console.log("\n✅ Build concluído com sucesso!");
  console.log(`📁 Arquivos prontos em: ${buildDir}`);
  console.log("\n📤 Próximos passos:");
  console.log("   1. Faça upload de TODOS os arquivos da pasta 'reachbuild' para o cPanel");
  console.log("   2. Certifique-se de que o arquivo .htaccess foi enviado");
  console.log("   3. Configure as permissões:");
  console.log("      - Arquivos: 644");
  console.log("      - Diretórios: 755");
  console.log("      - .htaccess: 644");
  console.log("   4. Acesse seu site para verificar se está funcionando\n");
}

buildForCpanel().catch((err) => {
  console.error("❌ Erro no build:", err);
  process.exit(1);
});

