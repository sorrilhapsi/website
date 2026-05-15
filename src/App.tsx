/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Instagram,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ArrowDown,
  Youtube,
  Facebook,
  Music,
} from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato do Site - ${name}`);
    const body = encodeURIComponent(
      `Nome: ${name}\nWhatsApp: ${whatsapp}\n\nMensagem:\n${message}`,
    );
    window.location.href = `mailto:sorrilhapsi@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "J" || e.key === "C")
      ) {
        e.preventDefault();
        return false;
      }
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3 seconds plus a little buffer

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleForm = () => setIsFormVisible(!isFormVisible);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#sobre" },
    { name: "Contato", href: "#contato" },
    { name: "Dicas", href: "https://linktr.ee/sorrilhapsi", isExternal: true },
  ];

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 3.5, // Starting after the intro
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const leftVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      <header>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="intro"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-beige"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-[300px] w-full px-6 mb-12 text-center"
              >
                <img
                  src="logotipocompleto.png"
                  alt="Logo Intro"
                  className="w-full h-auto"
                />
              </motion.div>

              <div className="w-48 h-[2px] bg-brand-brown/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-brand-brown"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation - Hamburger */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-end">
          <button
            onClick={toggleMenu}
            className="p-3 glass-card rounded-full hover:scale-110 transition-transform active:scale-95 z-50 pointer-events-auto force-gpu"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 bg-brand-brown z-40 flex flex-col items-center justify-center gap-8 force-gpu"
              >
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="text-4xl md:text-6xl text-brand-beige font-distrampler force-gpu hover:scale-105 active:scale-95"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <main>
        {/* HERO SECTION - REFINED */}
        <section
          id="home"
          className="relative min-h-[100vh] flex flex-col pt-[30px] overflow-hidden"
        >
          {/* ↓ ALTERAÇÃO: md:pl-[430px] → md:pl-[280px], adicionado md:pt-[40px], md:max-w-[800px] → md:max-w-[620px] */}
          <motion.div
            className="px-[30px] md:pl-[280px] md:pt-[40px] relative z-10 flex flex-col items-start force-gpu md:max-w-[620px]"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* logotipo.png now part of the vertical flow */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3, delay: 3, ease: "easeOut" }}
              className="force-gpu mb-[25px] md:mb-[30px]"
            >
              <img
                src="logotipo.png"
                alt="Logotipo Gabriella Sorrilha Psicologia"
                className="w-12 h-12 md:w-20 md:h-20 object-contain"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="force-gpu mb-[25px] md:mb-[50px]"
            >
              <h1 className="text-7xl md:text-[10rem] leading-[0.8] font-light tracking-tighter text-brand-brown font-distrampler text-left">
                Sua <br />
                história <br />
                importa
              </h1>
            </motion.div>

            <motion.div variants={leftVariants} className="force-gpu">
              <a
                href="https://wa.me/5521981649163"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-brand-brown text-brand-brown rounded-full px-5 py-2.5 text-sm md:text-base font-medium tracking-wider transition-all duration-300 hover:bg-brand-brown hover:text-brand-beige hover:scale-105 active:scale-95 uppercase font-montserrat"
              >
                Agendar consulta
              </a>
            </motion.div>
          </motion.div>

          {/* case.png Aligned to Bottom Right of Home */}
          <div className="absolute bottom-0 right-0 w-full max-w-6xl z-0 pointer-events-none flex justify-end items-end">
            <img
              src="case.png"
              alt="Gabriella Sorrilha - Psicóloga Clínica no Rio de Janeiro"
              loading="lazy"
              className="w-auto h-[50vh] md:h-[90vh] object-contain object-bottom right-0"
            />
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-[30px] md:left-[430px] z-20 flex flex-col items-center gap-2 text-brand-brown opacity-40 force-gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 5, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="force-gpu"
            >
              <ArrowDown size={32} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </section>

        {/* SOBRE SECTION - Refined Biography */}
        <section
          id="sobre"
          className="relative z-10 py-32 px-[30px] md:px-20 bg-brand-brown text-brand-beige"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-10 text-left force-gpu"
            >
              <div className="space-y-2">
                <h2 className="text-5xl md:text-7xl font-light font-distrampler leading-none">
                  Gabriella Sorrilha
                </h2>
                <p className="text-3xl md:text-4xl font-light font-distrampler opacity-60">
                  Psicóloga Clínica
                </p>
              </div>
              <div className="glass-card p-10 md:p-12 space-y-8 text-left">
                <p className="text-xl md:text-2xl leading-relaxed opacity-90 font-montserrat">
                  Atendimento com foco em acolhimento emocional e escuta
                  humanizada. Sua história merece um espaço seguro.
                </p>
                <div className="space-y-4 text-lg font-montserrat">
                  <p>• Desenvolvimento pessoal, autoestima e saúde emocional</p>
                  <p>
                    • Ênfase em Gestalt-terapia e fenomenologia, que busca
                    aumentar a autoconsciência do paciente sobre seus
                    sentimentos, comportamentos e relações
                  </p>
                  <p>
                    • Individual para adolescentes, adultos e terapia de casal
                  </p>
                </div>
                <div className="pt-10 text-left">
                  <p className="font-light tracking-tighter text-3xl font-distrampler leading-tight">
                    Registro CRP: <br /> 05/85803
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TOPICS SECTION - Inverted Colors dedicated section */}
        <section
          id="topicos"
          className="relative z-10 py-24 px-[30px] md:px-20 bg-brand-beige text-brand-brown"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 force-gpu"
            >
              {[
                "Relações e Vínculos",
                "Compulsividade",
                "Autoestima",
                "Relacionamentos",
                "Recomeços",
                "Maternidade",
                "Acolhimento",
                "Vivências Femininas",
              ].map((topic) => (
                <motion.div
                  key={topic}
                  variants={itemVariants}
                  className="bg-brand-brown text-brand-beige rounded-[2rem] p-4 md:p-6 flex items-center justify-center text-center text-sm md:text-base font-montserrat hover:bg-opacity-90 min-h-[100px] force-gpu"
                >
                  {topic}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SERVICOS SECTION - Brief & Minimal */}
        <section
          id="servicos"
          className="relative z-10 py-20 px-10 md:px-20 bg-brand-brown text-brand-beige"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto text-center space-y-10 force-gpu"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-light font-distrampler force-gpu"
            >
              Especialidades
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-20">
              <motion.div
                variants={itemVariants}
                className="space-y-2 force-gpu"
              >
                <span className="text-8xl opacity-10">01</span>
                <p className="text-2xl font-medium uppercase tracking-widest font-montserrat">
                  AUTOCONHECIMENTO
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="space-y-2 force-gpu"
              >
                <span className="text-8xl opacity-10">02</span>
                <p className="text-2xl font-medium uppercase tracking-widest font-montserrat">
                  Autoestima
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="space-y-2 force-gpu"
              >
                <span className="text-8xl opacity-10">03</span>
                <p className="text-2xl font-medium uppercase tracking-widest font-montserrat">
                  Sobrecarga
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* VIDEO SECTION - Spacing Reduced */}
        <section className="relative z-10 pt-20 pb-10 px-10 md:px-20 bg-brand-beige">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden aspect-square relative group force-gpu md:w-[300px] md:h-[300px] md:mx-auto"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/c8cKrLcFDZI"
                title="Apresentação Gabriella Sorrilha"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* CONTATO SECTION - Spacing Reduced */}
        <section
          id="contato"
          className="relative z-10 py-10 pb-32 px-10 md:px-20 overflow-hidden bg-brand-beige"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 blur-[100px] -z-10" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto glass-card p-10 md:p-16 text-left space-y-16 force-gpu"
          >
            <motion.div variants={itemVariants} className="space-y-4 force-gpu">
              <h2 className="text-5xl md:text-7xl font-distrampler">
                Vamos conversar?
              </h2>
              <p className="text-xl opacity-70 font-light font-montserrat">
                Agende sua consulta on-line ou presencial.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div className="space-y-10 font-montserrat">
                <motion.div
                  variants={itemVariants}
                  className="flex gap-6 items-start force-gpu"
                >
                  <MapPin className="text-brand-brown mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Localização</h3>
                    <p className="text-lg opacity-80 leading-snug">
                      Presencial no Rio de Janeiro.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex gap-6 items-start force-gpu"
                >
                  <Clock className="text-brand-brown mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Horários</h3>
                    <p className="text-lg opacity-80">
                      Segunda à sexta
                      <br />
                      9h às 18h
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col gap-4 font-montserrat">
                <motion.a
                  variants={itemVariants}
                  href="https://wa.me/5521981649163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-brown text-brand-beige rounded-2xl px-6 py-5 flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all shadow-lg font-montserrat force-gpu"
                >
                  <span className="flex items-center gap-4 text-xl font-montserrat">
                    <MessageCircle size={24} />
                    <div className="flex flex-col items-start leading-tight">
                      <span>WhatsApp</span>
                      <span className="text-xs opacity-80 whitespace-nowrap">(21) 98164-9163</span>
                    </div>
                  </span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </motion.a>
                <AnimatePresence>
                  {isFormVisible && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-4 pt-4 text-left font-montserrat"
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-medium uppercase tracking-widest pl-2">
                          Nome
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full bg-white/10 border border-brand-brown rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-brown/50 transition-all font-montserrat"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium uppercase tracking-widest pl-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="w-full bg-white/10 border border-brand-brown rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-brown/50 transition-all font-montserrat"
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-sm font-medium uppercase tracking-widest pl-2">
                          Mensagem
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Como posso te ajudar?"
                          maxLength={500}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-white/10 border border-brand-brown rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-brown/50 transition-all font-montserrat resize-none"
                        ></textarea>
                        <div className="text-[10px] text-right opacity-50 pr-2">
                          {message.length} / 500
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-brand-brown text-brand-beige rounded-2xl py-5 text-lg font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg font-montserrat"
                      >
                        Enviar
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Secondary Social Links - Reduced Emphasis */}
                <div className="pt-12 flex flex-nowrap gap-2 justify-start items-center opacity-40 border-t border-brand-brown/10 mt-6 md:gap-3 overflow-x-visible">
                  <motion.a
                    variants={itemVariants}
                    href="https://www.instagram.com/sorrilhapsi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform hover:opacity-100"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} />
                  </motion.a>
                  <motion.a
                    variants={itemVariants}
                    href="https://www.facebook.com/sorrilhapsi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform hover:opacity-100"
                    aria-label="Facebook"
                  >
                    <Facebook size={24} />
                  </motion.a>
                  <motion.a
                    variants={itemVariants}
                    href="https://www.youtube.com/@sorrilhapsi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform hover:opacity-100"
                    aria-label="YouTube"
                  >
                    <Youtube size={24} />
                  </motion.a>
                  <motion.a
                    variants={itemVariants}
                    href="https://www.tiktok.com/@sorrilhapsi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform hover:opacity-100"
                    aria-label="TikTok"
                  >
                    <Music size={24} />
                  </motion.a>
                  <motion.a
                    variants={itemVariants}
                    href="http://x.com/sorrilhapsi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform hover:opacity-100"
                    aria-label="X"
                  >
                    <X size={24} />
                  </motion.a>
                  <motion.a
                    variants={itemVariants}
                    href="mailto:sorrilhapsi@gmail.com?subject=Quero%20agendar%20uma%20consulta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform hover:opacity-100"
                    aria-label="E-mail"
                    onClick={() => {
                      window.location.href = "mailto:sorrilhapsi@gmail.com?subject=Quero%20agendar%20uma%20consulta";
                    }}
                  >
                    <Mail size={24} />
                  </motion.a>
                  <motion.a
                    variants={itemVariants}
                    href="https://google.com/maps?sca_esv=c018065cd68db856&rlz=1C1VDKB_pt-PTBR1077BR1078&biw=1366&bih=651&sxsrf=ANbL-n56Ya3CzWsh2sBqdEVHgV3DcQfwmQ:1778797876155&kgmid=/g/11hdx1ddfx&shem=dlvsc,rimspwouoe&shndl=30&kgs=26f5fc71a7606b91&um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KYvB88iD2ZsAMb2x4L7JTgWY&daddr=Av.+Embaixador+Abelardo+Bueno,+600+-+Barra+da+Tijuca,+Rio+de+Janeiro+-+RJ,+22775-040"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform hover:opacity-100"
                    aria-label="Localização"
                  >
                    <MapPin size={24} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* REFINED FOOTER */}
      <footer className="relative z-10 flex flex-col items-center bg-brand-beige text-brand-brown pt-20 pb-20 px-10 overflow-hidden">
        {/* logotipocompleto.png moved up (overlapping slightly) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-[320px] w-full px-6 mb-10"
        >
          <img
            src="logotipocompleto.png"
            alt="Gabriella Sorrilha Logo"
            className="w-full h-auto opacity-80"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-10 z-10 w-full force-gpu"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-all duration-300 hover:scale-125 pt-4 force-gpu"
            aria-label="Voltar para o topo"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="force-gpu"
            >
              <ArrowRight className="rotate-[-90deg] w-8 h-8 text-brand-brown opacity-50" />
            </motion.div>
          </button>
        </motion.div>

        <div className="w-full flex justify-center mt-16">
          <a
            href="https://taccone.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-[14.4px] text-brand-brown uppercase font-sans"
          >
            TACCONE®. TODOS OS DIREITOS RESERVADOS.
          </a>
        </div>
      </footer>
    </div>
  );
}
