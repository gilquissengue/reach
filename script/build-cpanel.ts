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
  const buildDir = path.resolve(process.cwd(), "build");
  if (existsSync(buildDir)) {
    console.log("🗑️  Cleaning previous build directory...");
    await rm(buildDir, { recursive: true, force: true });
  }

  // Criar diretório build
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
  console.log("⚙️  Creating .htaccess file for SPA routing...");
  const htaccessContent = `# REACH Performance Marketing - cPanel Configuration
# SPA Routing - Redirect all requests to index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite files or directories that exist
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  # Prevent MIME type sniffing
  Header set X-Content-Type-Options "nosniff"
  
  # XSS Protection
  Header set X-XSS-Protection "1; mode=block"
  
  # Prevent clickjacking
  Header set X-Frame-Options "SAMEORIGIN"
  
  # Referrer Policy
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # HTML
  ExpiresByType text/html "access plus 0 seconds"
  
  # Fonts
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Force HTTPS (opcional - descomente se quiser forçar HTTPS)
# <IfModule mod_rewrite.c>
#   RewriteCond %{HTTPS} off
#   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
# </IfModule>

# Prevent access to hidden files
<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>
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
3. Faça upload de TODOS os arquivos desta pasta \`build\`
4. Certifique-se de que o arquivo \`.htaccess\` foi enviado (arquivos ocultos podem precisar ser visualizados)

### Opção 2: Upload via FTP

1. Conecte-se ao seu servidor via FTP usando as credenciais do cPanel
2. Navegue até o diretório público (geralmente \`public_html\`)
3. Faça upload de TODOS os arquivos da pasta \`build\`
4. Certifique-se de que o modo de transferência está configurado como BINARY para arquivos de imagem

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
build/
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

### Site não carrega
- Verifique se todos os arquivos foram enviados
- Confirme que o .htaccess está presente
- Verifique os logs de erro do cPanel

### Rotas não funcionam
- Certifique-se de que o mod_rewrite está habilitado no Apache
- Verifique se o .htaccess está sendo lido (pode precisar de permissões especiais)

### Arquivos não carregam
- Verifique as permissões dos arquivos (geralmente 644 para arquivos, 755 para diretórios)
- Confirme que os caminhos dos assets estão corretos

---

**Build gerado em:** ${new Date().toLocaleString('pt-BR')}
`;

  const readmePath = path.join(buildDir, "README-DEPLOY.md");
  await writeFile(readmePath, readmeContent, "utf-8");

  console.log("\n✅ Build concluído com sucesso!");
  console.log(`📁 Arquivos prontos em: ${buildDir}`);
  console.log("\n📤 Próximos passos:");
  console.log("   1. Faça upload de TODOS os arquivos da pasta 'build' para o cPanel");
  console.log("   2. Certifique-se de que o arquivo .htaccess foi enviado");
  console.log("   3. Acesse seu site para verificar se está funcionando\n");
}

buildForCpanel().catch((err) => {
  console.error("❌ Erro no build:", err);
  process.exit(1);
});

