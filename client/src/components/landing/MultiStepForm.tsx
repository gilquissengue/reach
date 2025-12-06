import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, ChevronLeft, Check, Terminal, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone inválido"),
  objective: z.string(),
  invests_in_ads: z.string(),
  budget: z.string(),
  platforms: z.array(z.string()),
  ad_accounts_status: z.string(),
  urgency: z.string(),
  sector: z.string().min(2, "Sector é obrigatório"),
  team_size: z.string(),
  contact_role: z.string(),
  call_alignment: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { id: 'contact', title: 'Start' },
  { id: 'objective', title: 'Target' },
  { id: 'ads_history', title: 'History' },
  { id: 'budget', title: 'Budget' },
  { id: 'platforms', title: 'Channels' },
  { id: 'accounts', title: 'Status' },
  { id: 'urgency', title: 'Timeline' },
  { id: 'details', title: 'Profile' },
  { id: 'role', title: 'Role' },
  { id: 'finish', title: 'Finish' },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platforms: [],
    }
  });

  const platforms = watch("platforms");

  const onNext = () => setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#60A5FA', '#FFFFFF']
    });
  };

  if (isSuccess) {
    return (
      <section className="py-32 bg-[#020617] relative border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-2xl border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.2)]"
          >
            <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/50">
              <Check className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-4xl font-bold font-display text-white mb-4">Solicitação Recebida</h2>
            <p className="text-gray-400 text-lg mb-8">
              Nossa inteligência artificial já está analisando seus dados. 
              Um estrategista entrará em contato em breve.
            </p>
            <div className="bg-white/5 p-4 rounded-lg font-mono text-sm text-blue-300 inline-block">
              &gt; STATUS: PROCESSED_SUCCESSFULLY <br/>
              &gt; TICKET_ID: #RCH-{Math.floor(Math.random() * 10000)}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-[#020617] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="md:col-span-4 space-y-8 hidden md:block">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">Configurar Projeto</h2>
              <p className="text-gray-400 text-sm">Preencha os parâmetros para inicializar o planeamento estratégico.</p>
            </div>
            
            <div className="space-y-2 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/10" />
              {STEPS.map((s, i) => (
                <div 
                  key={s.id}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg transition-all duration-300 relative z-10",
                    step === i ? "bg-blue-600/10 border border-blue-600/20 translate-x-2" : "opacity-40"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono border transition-all duration-300",
                    step === i ? "bg-blue-600 border-blue-600 text-white scale-110 shadow-[0_0_10px_#2563EB]" : "bg-[#020617] border-white/20 text-white/40"
                  )}>
                    {step > i ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className={cn(
                    "text-sm font-medium font-mono uppercase tracking-wider",
                    step === i ? "text-blue-400" : "text-gray-400"
                  )}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-8">
            <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 min-h-[500px] flex flex-col relative overflow-hidden shadow-2xl">
              {/* Decorative scanline */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 animate-[scan_2s_linear_infinite]" />
              
              <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-600">
                SECURE_CONNECTION_ESTABLISHED
              </div>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Render Steps */}
                    {step === 0 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-blue-400 mb-6">
                          <Terminal className="w-5 h-5" />
                          <span className="text-xs font-mono uppercase tracking-wider">Initialize_User_Data</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white font-display">Dados de Contacto</h3>
                        <div className="grid gap-6">
                          <div className="group">
                            <Label className="text-gray-400 mb-2 block group-focus-within:text-blue-400 transition-colors">Nome Completo</Label>
                            <Input {...register("name")} className="bg-white/5 border-white/10 text-white focus:border-blue-500 h-14 text-lg px-4 transition-all focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]" placeholder="Digite seu nome" />
                            {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
                          </div>
                          <div className="group">
                            <Label className="text-gray-400 mb-2 block group-focus-within:text-blue-400 transition-colors">Email Corporativo</Label>
                            <Input {...register("email")} className="bg-white/5 border-white/10 text-white focus:border-blue-500 h-14 text-lg px-4 transition-all focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]" placeholder="seu@empresa.com" />
                            {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
                          </div>
                          <div className="group">
                            <Label className="text-gray-400 mb-2 block group-focus-within:text-blue-400 transition-colors">Telefone (+244)</Label>
                            <Input {...register("phone")} className="bg-white/5 border-white/10 text-white focus:border-blue-500 h-14 text-lg px-4 transition-all focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]" placeholder="9XX XXX XXX" />
                            {errors.phone && <span className="text-red-500 text-sm mt-1 block">{errors.phone.message}</span>}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white font-display">Objectivo Principal</h3>
                        <RadioGroup onValueChange={(val) => setValue("objective", val)} className="grid gap-3">
                          {["Gerar leads qualificadas", "Aumentar volume de vendas", "Brand Awareness", "Auditoria de Contas", "Recuperação de Acessos"].map((opt) => (
                            <OptionItem key={opt} value={opt} label={opt} />
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                    
                     {step === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white font-display">Histórico de Investimento</h3>
                        <RadioGroup onValueChange={(val) => setValue("invests_in_ads", val)} className="grid gap-3">
                          {["Sim, investimento recorrente", "Sim, esporadicamente", "Não, nunca investimos"].map((opt) => (
                            <OptionItem key={opt} value={opt} label={opt} />
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white font-display">Budget Mensal (AKZ)</h3>
                        <RadioGroup onValueChange={(val) => setValue("budget", val)} className="grid gap-3">
                          {["< 150.000", "150.000 - 350.000", "350.000 - 800.000", "> 800.000", "A definir"].map((opt) => (
                            <OptionItem key={opt} value={opt} label={opt} />
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                     {step === 4 && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white font-display">Canais de Interesse</h3>
                        <div className="grid gap-3">
                          {["Meta (FB/IG)", "Google Ads", "LinkedIn", "Não tenho certeza"].map((opt) => (
                            <div key={opt} className="flex items-center space-x-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                              <Checkbox 
                                id={opt} 
                                className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 w-5 h-5 rounded-md transition-all"
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setValue("platforms", [...platforms, opt]);
                                  } else {
                                    setValue("platforms", platforms.filter((p) => p !== opt));
                                  }
                                }}
                                checked={platforms.includes(opt)}
                              />
                              <label htmlFor={opt} className="text-lg font-medium text-white cursor-pointer w-full group-hover:text-blue-200 transition-colors">
                                {opt}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {step >= 5 && step < 9 && (
                       <div className="space-y-6">
                         <h3 className="text-3xl font-bold text-white font-display">Detalhes Adicionais</h3>
                         {step === 5 && (
                           <RadioGroup onValueChange={(val) => setValue("ad_accounts_status", val)} className="grid gap-3">
                              <h4 className="text-gray-400 mb-2 font-mono text-sm uppercase">Status das Contas de Anúncios</h4>
                              {["Ativas e Saudáveis", "Com restrições/bloqueios", "Inexistentes", "Desconhecido"].map((opt) => (
                                <OptionItem key={opt} value={opt} label={opt} />
                              ))}
                           </RadioGroup>
                         )}
                         {step === 6 && (
                            <RadioGroup onValueChange={(val) => setValue("urgency", val)} className="grid gap-3">
                              <h4 className="text-gray-400 mb-2 font-mono text-sm uppercase">Urgência do Projeto</h4>
                              {["Imediata", "30 dias", "Exploratório"].map((opt) => (
                                <OptionItem key={opt} value={opt} label={opt} />
                              ))}
                           </RadioGroup>
                         )}
                          {step === 7 && (
                             <div className="space-y-6">
                                <div>
                                  <Label className="text-gray-400 mb-2 block font-mono text-sm uppercase">Setor de Atuação</Label>
                                  <Input {...register("sector")} className="bg-white/5 border-white/10 text-white focus:border-blue-500 h-14 text-lg" placeholder="Ex: Tecnologia, Varejo..." />
                                </div>
                                
                                <div>
                                  <Label className="text-gray-400 mb-2 block mt-4 font-mono text-sm uppercase">Tamanho da Equipe</Label>
                                  <RadioGroup onValueChange={(val) => setValue("team_size", val)} className="grid grid-cols-2 gap-3">
                                    {["1-5", "6-20", "21-50", "50+"].map((opt) => (
                                      <OptionItem key={opt} value={opt} label={opt} />
                                    ))}
                                  </RadioGroup>
                                </div>
                             </div>
                         )}
                          {step === 8 && (
                           <RadioGroup onValueChange={(val) => setValue("contact_role", val)} className="grid gap-3">
                              <h4 className="text-gray-400 mb-2 font-mono text-sm uppercase">Seu Cargo</h4>
                              {["C-Level / Diretor", "Gerente de Marketing", "Proprietário", "Outro"].map((opt) => (
                                <OptionItem key={opt} value={opt} label={opt} />
                              ))}
                           </RadioGroup>
                         )}
                       </div>
                    )}

                    {step === 9 && (
                       <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white font-display">Confirmação Final</h3>
                        <p className="text-gray-400 text-lg">Gostaria de agendar uma reunião de alinhamento com um especialista?</p>
                         <RadioGroup onValueChange={(val) => setValue("call_alignment", val)} className="grid gap-3">
                            {["Sim, quero agendar agora", "Não, prefiro contacto por email"].map((opt) => (
                              <OptionItem key={opt} value={opt} label={opt} />
                            ))}
                         </RadioGroup>
                       </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between pt-8 border-t border-white/5 mt-auto items-center">
                <Button 
                  variant="ghost" 
                  onClick={onBack} 
                  disabled={step === 0 || isSubmitting}
                  className="text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                
                {step === STEPS.length - 1 ? (
                  <Button 
                    onClick={handleSubmit(onSubmit)} 
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-10 h-12 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105 font-medium tracking-wide"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitação <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button onClick={onNext} className="bg-white text-black hover:bg-gray-200 px-8 h-12 rounded-full font-medium transition-all hover:scale-105">
                    Continuar <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OptionItem({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className="flex items-center justify-between p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500/10 cursor-pointer transition-all group shadow-sm hover:shadow-md"
      >
        <span className="text-white text-lg group-hover:text-blue-200 transition-colors">{label}</span>
        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500 transition-all">
          <Check className="w-3 h-3 text-white opacity-0 peer-data-[state=checked]:opacity-100" />
        </div>
      </Label>
    </div>
  );
}
