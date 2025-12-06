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
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
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
  { id: 'contact', title: 'Dados de Contacto' },
  { id: 'objective', title: 'Objectivo' },
  { id: 'ads_history', title: 'Histórico de Anúncios' },
  { id: 'budget', title: 'Orçamento' },
  { id: 'platforms', title: 'Plataformas' },
  { id: 'accounts', title: 'Contas de Anúncios' },
  { id: 'urgency', title: 'Urgência' },
  { id: 'details', title: 'Detalhes da Empresa' },
  { id: 'role', title: 'Função' },
  { id: 'finish', title: 'Finalizar' },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platforms: [],
    }
  });

  const platforms = watch("platforms");

  const onNext = () => {
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const onBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Formulário enviado com sucesso! (Simulação)");
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-brand-blue-light relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-brand-blue-dark mb-4">Vamos elaborar um orçamento personalizado</h2>
          <p className="text-gray-600">Partilhe connosco a tua necessidade.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-brand-blue">Passo {step + 1} de {STEPS.length}</span>
            <span className="text-sm font-medium text-gray-500">{STEPS[step].title}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-blue"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <Card className="border-none shadow-2xl shadow-brand-blue/10 overflow-hidden">
          <CardContent className="p-8 min-h-[400px] flex flex-col">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="flex-1"
              >
                {/* STEP 0: CONTACT */}
                {step === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">Dados de Contacto</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Nome</Label>
                        <Input {...register("name")} placeholder="Teu nome completo" className="h-12 bg-gray-50 border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20" />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input {...register("email")} placeholder="teu@email.com" className="h-12 bg-gray-50 border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20" />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                      </div>
                      <div>
                        <Label>Telefone (🇦🇴 +244)</Label>
                        <Input {...register("phone")} placeholder="9XX XXX XXX" className="h-12 bg-gray-50 border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20" />
                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: OBJECTIVE */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">Qual é o principal objectivo da sua empresa neste momento?</h3>
                    <RadioGroup onValueChange={(val) => setValue("objective", val)} className="grid gap-4">
                      {["Gerar leads", "Aumentar vendas", "Crescer seguidores/engajamento", "Reestruturar contas de anúncios", "Resolver bloqueios/acessos", "Outro"].map((opt) => (
                        <div key={opt}>
                          <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                          <Label
                            htmlFor={opt}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-brand-blue-light/30 hover:border-brand-blue/30 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light/50 cursor-pointer transition-all"
                          >
                            {opt}
                            <Check className="w-4 h-4 text-brand-blue opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* STEP 2: ADS HISTORY */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">A sua empresa já investe em publicidade paga?</h3>
                    <RadioGroup onValueChange={(val) => setValue("invests_in_ads", val)} className="grid gap-4">
                      {["Sim, regularmente", "Sim, mas de forma pontual", "Não, será a primeira vez"].map((opt) => (
                        <div key={opt}>
                          <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                          <Label
                            htmlFor={opt}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-brand-blue-light/30 hover:border-brand-blue/30 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light/50 cursor-pointer transition-all"
                          >
                            {opt}
                            <Check className="w-4 h-4 text-brand-blue opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* STEP 3: BUDGET */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">Qual é o orçamento mensal disponível para campanhas de mídia paga?</h3>
                    <RadioGroup onValueChange={(val) => setValue("budget", val)} className="grid gap-4">
                      {["Menos de 150.000 AKZ", "Entre 150.000 e 350.000 AKZ", "Entre 350.000 e 800.000 AKZ", "Acima de 800.000 AKZ", "Ainda não definido"].map((opt) => (
                        <div key={opt}>
                          <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                          <Label
                            htmlFor={opt}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-brand-blue-light/30 hover:border-brand-blue/30 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light/50 cursor-pointer transition-all"
                          >
                            {opt}
                            <Check className="w-4 h-4 text-brand-blue opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* STEP 4: PLATFORMS */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">Em quais plataformas pretende anunciar?</h3>
                    <div className="grid gap-4">
                      {["META (Facebook/Instagram)", "Google Ads", "LinkedIn Ads", "Não tenho a certeza, preciso de orientação"].map((opt) => (
                        <div key={opt} className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-100 hover:bg-brand-blue-light/30 transition-colors">
                          <Checkbox 
                            id={opt} 
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setValue("platforms", [...platforms, opt]);
                              } else {
                                setValue("platforms", platforms.filter((p) => p !== opt));
                              }
                            }}
                            checked={platforms.includes(opt)}
                          />
                          <label htmlFor={opt} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">
                            {opt}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: ACCOUNTS */}
                {step === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">A empresa já possui contas de anúncios configuradas?</h3>
                    <RadioGroup onValueChange={(val) => setValue("ad_accounts_status", val)} className="grid gap-4">
                      {["Sim, todas activas", "Sim, mas com problemas", "Não, precisamos de criar", "Não sei"].map((opt) => (
                        <div key={opt}>
                          <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                          <Label
                            htmlFor={opt}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-brand-blue-light/30 hover:border-brand-blue/30 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light/50 cursor-pointer transition-all"
                          >
                            {opt}
                            <Check className="w-4 h-4 text-brand-blue opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* STEP 6: URGENCY */}
                {step === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">Que nível de urgência tem este projecto?</h3>
                    <RadioGroup onValueChange={(val) => setValue("urgency", val)} className="grid gap-4">
                      {["Preciso começar imediatamente", "Dentro de 30 dias", "Estou apenas a recolher informações"].map((opt) => (
                        <div key={opt}>
                          <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                          <Label
                            htmlFor={opt}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-brand-blue-light/30 hover:border-brand-blue/30 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light/50 cursor-pointer transition-all"
                          >
                            {opt}
                            <Check className="w-4 h-4 text-brand-blue opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* STEP 7: DETAILS */}
                {step === 7 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">Detalhes da Empresa</h3>
                    <div className="space-y-6">
                      <div>
                        <Label>Qual é o sector de actividade da sua empresa?</Label>
                        <Input {...register("sector")} placeholder="Ex: Tecnologia, Saúde, Educação..." className="h-12 bg-gray-50 border-gray-200" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Quantas pessoas trabalham actualmente na empresa?</Label>
                        <RadioGroup onValueChange={(val) => setValue("team_size", val)} className="grid grid-cols-2 gap-4">
                          {["1 a 5", "6 a 20", "21 a 50", "Mais de 50"].map((opt) => (
                            <div key={opt}>
                              <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                              <Label
                                htmlFor={opt}
                                className="flex items-center justify-center p-3 rounded-lg border-2 border-gray-100 bg-white hover:bg-brand-blue-light/30 hover:border-brand-blue/30 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light/50 cursor-pointer transition-all text-center"
                              >
                                {opt}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 8: ROLE */}
                {step === 8 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">Quem será o principal ponto de contacto para o projecto?</h3>
                    <RadioGroup onValueChange={(val) => setValue("contact_role", val)} className="grid gap-4">
                      {["Director(a)", "CEO", "Responsável de Marketing", "Empreendedor / Proprietário", "Outro"].map((opt) => (
                        <div key={opt}>
                          <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                          <Label
                            htmlFor={opt}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-brand-blue-light/30 hover:border-brand-blue/30 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light/50 cursor-pointer transition-all"
                          >
                            {opt}
                            <Check className="w-4 h-4 text-brand-blue opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* STEP 9: CALL ALIGNMENT */}
                {step === 9 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-blue-dark">Está disposto(a) a agendar uma chamada para alinhamento antes de avançarmos?</h3>
                     <RadioGroup onValueChange={(val) => setValue("call_alignment", val)} className="grid gap-4">
                      {["Sim", "Não"].map((opt) => (
                        <div key={opt}>
                          <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                          <Label
                            htmlFor={opt}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-brand-blue-light/30 hover:border-brand-blue/30 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light/50 cursor-pointer transition-all"
                          >
                            {opt}
                            <Check className="w-4 h-4 text-brand-blue opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-between pt-8 mt-auto border-t border-gray-100">
              <Button 
                variant="ghost" 
                onClick={onBack} 
                disabled={step === 0}
                className="text-gray-500 hover:text-brand-blue"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              
              {step === STEPS.length - 1 ? (
                <Button onClick={handleSubmit(onSubmit)} className="bg-brand-blue hover:bg-blue-700 text-white px-8">
                  Enviar Pedido <Check className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={onNext} className="bg-brand-blue hover:bg-blue-700 text-white px-8">
                  Próximo <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
