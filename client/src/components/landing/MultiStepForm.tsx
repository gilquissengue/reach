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
import { ChevronRight, ChevronLeft, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

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
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platforms: [],
    }
  });

  const platforms = watch("platforms");

  const onNext = () => setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Dados processados com sucesso. Entraremos em contacto.");
  };

  return (
    <section className="py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">Configurar Projeto</h2>
              <p className="text-gray-400 text-sm">Preencha os parâmetros para inicializar o planeamento estratégico.</p>
            </div>
            
            <div className="space-y-2">
              {STEPS.map((s, i) => (
                <div 
                  key={s.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                    step === i ? "bg-blue-600/10 border border-blue-600/20" : "opacity-40"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono border",
                    step === i ? "bg-blue-600 border-blue-600 text-white" : "border-white/20 text-white/40"
                  )}>
                    {i + 1}
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
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
            <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 min-h-[500px] flex flex-col relative overflow-hidden">
              {/* Decorative scanline */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 animate-[scan_2s_linear_infinite]" />

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
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
                        <h3 className="text-2xl font-bold text-white">Dados de Contacto</h3>
                        <div className="grid gap-6">
                          <div>
                            <Label className="text-gray-400">Nome Completo</Label>
                            <Input {...register("name")} className="bg-white/5 border-white/10 text-white focus:border-blue-500 h-12" />
                          </div>
                          <div>
                            <Label className="text-gray-400">Email Corporativo</Label>
                            <Input {...register("email")} className="bg-white/5 border-white/10 text-white focus:border-blue-500 h-12" />
                          </div>
                          <div>
                            <Label className="text-gray-400">Telefone (+244)</Label>
                            <Input {...register("phone")} className="bg-white/5 border-white/10 text-white focus:border-blue-500 h-12" />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Objectivo Principal</h3>
                        <RadioGroup onValueChange={(val) => setValue("objective", val)} className="grid gap-3">
                          {["Gerar leads qualificadas", "Aumentar volume de vendas", "Brand Awareness", "Auditoria de Contas", "Recuperação de Acessos"].map((opt) => (
                            <OptionItem key={opt} value={opt} label={opt} />
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                    
                     {step === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Histórico de Investimento</h3>
                        <RadioGroup onValueChange={(val) => setValue("invests_in_ads", val)} className="grid gap-3">
                          {["Sim, investimento recorrente", "Sim, esporadicamente", "Não, nunca investimos"].map((opt) => (
                            <OptionItem key={opt} value={opt} label={opt} />
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Budget Mensal (AKZ)</h3>
                        <RadioGroup onValueChange={(val) => setValue("budget", val)} className="grid gap-3">
                          {["< 150.000", "150.000 - 350.000", "350.000 - 800.000", "> 800.000", "A definir"].map((opt) => (
                            <OptionItem key={opt} value={opt} label={opt} />
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                     {step === 4 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Canais de Interesse</h3>
                        <div className="grid gap-3">
                          {["Meta (FB/IG)", "Google Ads", "LinkedIn", "Não tenho certeza"].map((opt) => (
                            <div key={opt} className="flex items-center space-x-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                              <Checkbox 
                                id={opt} 
                                className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setValue("platforms", [...platforms, opt]);
                                  } else {
                                    setValue("platforms", platforms.filter((p) => p !== opt));
                                  }
                                }}
                                checked={platforms.includes(opt)}
                              />
                              <label htmlFor={opt} className="text-sm font-medium text-white cursor-pointer w-full">
                                {opt}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {step >= 5 && step < 9 && (
                       <div className="space-y-6">
                         <h3 className="text-2xl font-bold text-white">Detalhes Adicionais</h3>
                         {step === 5 && (
                           <RadioGroup onValueChange={(val) => setValue("ad_accounts_status", val)} className="grid gap-3">
                              <h4 className="text-gray-400 mb-2">Status das Contas de Anúncios</h4>
                              {["Ativas e Saudáveis", "Com restrições/bloqueios", "Inexistentes", "Desconhecido"].map((opt) => (
                                <OptionItem key={opt} value={opt} label={opt} />
                              ))}
                           </RadioGroup>
                         )}
                         {step === 6 && (
                            <RadioGroup onValueChange={(val) => setValue("urgency", val)} className="grid gap-3">
                              <h4 className="text-gray-400 mb-2">Urgência do Projeto</h4>
                              {["Imediata", "30 dias", "Exploratório"].map((opt) => (
                                <OptionItem key={opt} value={opt} label={opt} />
                              ))}
                           </RadioGroup>
                         )}
                          {step === 7 && (
                             <div className="space-y-4">
                                <Label className="text-gray-400">Setor de Atuação</Label>
                                <Input {...register("sector")} className="bg-white/5 border-white/10 text-white focus:border-blue-500 h-12" placeholder="Ex: Tecnologia, Varejo..." />
                                
                                <Label className="text-gray-400 block mt-4">Tamanho da Equipe</Label>
                                <RadioGroup onValueChange={(val) => setValue("team_size", val)} className="grid grid-cols-2 gap-3">
                                  {["1-5", "6-20", "21-50", "50+"].map((opt) => (
                                    <OptionItem key={opt} value={opt} label={opt} />
                                  ))}
                                </RadioGroup>
                             </div>
                         )}
                          {step === 8 && (
                           <RadioGroup onValueChange={(val) => setValue("contact_role", val)} className="grid gap-3">
                              <h4 className="text-gray-400 mb-2">Seu Cargo</h4>
                              {["C-Level / Diretor", "Gerente de Marketing", "Proprietário", "Outro"].map((opt) => (
                                <OptionItem key={opt} value={opt} label={opt} />
                              ))}
                           </RadioGroup>
                         )}
                       </div>
                    )}

                    {step === 9 && (
                       <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Confirmação</h3>
                        <p className="text-gray-400">Gostaria de agendar uma reunião de alinhamento?</p>
                         <RadioGroup onValueChange={(val) => setValue("call_alignment", val)} className="grid gap-3">
                            {["Sim, vamos agendar", "Não, prefiro email"].map((opt) => (
                              <OptionItem key={opt} value={opt} label={opt} />
                            ))}
                         </RadioGroup>
                       </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between pt-8 border-t border-white/5 mt-auto">
                <Button 
                  variant="ghost" 
                  onClick={onBack} 
                  disabled={step === 0}
                  className="text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                
                {step === STEPS.length - 1 ? (
                  <Button onClick={handleSubmit(onSubmit)} className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    Processar Dados <Terminal className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={onNext} className="bg-white text-black hover:bg-gray-200 px-8 rounded-full">
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
        className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500/10 cursor-pointer transition-all group"
      >
        <span className="text-white group-hover:text-blue-200 transition-colors">{label}</span>
        <Check className="w-4 h-4 text-blue-500 opacity-0 peer-data-[state=checked]:opacity-100 transition-all scale-0 peer-data-[state=checked]:scale-100" />
      </Label>
    </div>
  );
}
