import { Mail, Instagram, Facebook } from 'lucide-react';

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dark-accent/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

            <div className="container mx-auto text-center max-w-4xl relative z-10">
                <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">
                    Let's <span className="text-dark-accent">Connect</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    <a
                        href="mailto:factsnreelinsta@gmail.com"
                        className="px-8 py-3 bg-dark-surface border border-dark-border rounded-md text-dark-text hover:border-dark-accent hover:text-dark-accent hover:shadow-neon transition-all duration-300 flex items-center gap-3 group"
                    >
                        <Mail className="group-hover:scale-110 transition-transform" size={24} />
                        <span className="font-semibold tracking-wide">Email Us</span>
                    </a>

                    <a
                        href="https://www.instagram.com/factsnreel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-dark-surface border border-dark-border rounded-md text-dark-text hover:border-dark-accent hover:text-dark-accent hover:shadow-neon transition-all duration-300 flex items-center gap-3 group"
                    >
                        <Instagram className="group-hover:scale-110 transition-transform" size={24} />
                        <span className="font-semibold tracking-wide">Instagram</span>
                    </a>

                    <a
                        href="https://www.facebook.com/factsnreel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-dark-surface border border-dark-border rounded-md text-dark-text hover:border-dark-accent hover:text-dark-accent hover:shadow-neon transition-all duration-300 flex items-center gap-3 group"
                    >
                        <Facebook className="group-hover:scale-110 transition-transform" size={24} />
                        <span className="font-semibold tracking-wide">Facebook</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
