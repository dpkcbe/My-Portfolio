'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaMicrosoft, FaDocker, FaGithub, FaJenkins, FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';
import { SiKubernetes, SiAnsible, SiTerraform, SiVmware } from 'react-icons/si';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [activeSection, setActiveSection] = useState('home');
  // Tooltip state for certifications
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id);
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler for showing tooltip
  const handleCertMouseMove = (e: React.MouseEvent) => {
    setTooltip({ visible: true, x: e.clientX + 12, y: e.clientY + 12 });
  };
  const handleCertMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0 });
  };
  // Handler for download
  const handleCertClick = (pdf: string) => {
    const link = document.createElement('a');
    link.href = `/${pdf}`;
    link.download = pdf;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen section-gradient">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex space-x-6">
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-gray-300 hover:text-[#e5decf] transition-colors ${
                    activeSection === item.id ? 'text-primary-600' : ''
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://www.linkedin.com/in/deepak-radhakrishnan-8a596816b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[#e5decf] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </motion.a>
              <a
                href="/Deepak_2025_Resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary bg-[#e5decf] text-black hover:bg-[#d6cdbb] px-4 py-2 text-sm flex items-center"
              >
                <FaDownload className="mr-2" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="section-padding hero-gradient text-white relative overflow-hidden min-h-screen flex items-center pt-32">
        <motion.div 
          className="absolute inset-0 glass-effect"
          style={{ opacity, scale }}
        />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.h1 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 text-white leading-tight break-words"
              >
                <span className="block mb-2">Deepak</span>
                <span className="block mt-2">Radhakrishnan</span>
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-6 text-[#e5decf]"
              >
                DevOps & Cloud Enthusiast | AI Generalist
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-300 mb-8"
              >
                Building robust cloud infrastructure and automating deployment pipelines
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="button-primary bg-[#e5decf] text-black hover:bg-[#d6cdbb] optimize-animation"
                >
                  View Projects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="button-secondary bg-[#e5decf] text-black hover:bg-[#d6cdbb] optimize-animation"
                >
                  Contact Me
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative"
            >
              <div className="flex justify-center items-center mb-8">
                <Image
                  src="/profile.png"
                  alt="Deepak Radhakrishnan"
                  width={400}
                  height={400}
                  className="object-contain w-[400px] h-[400px] max-w-full"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding pt-8 scroll-mt-16 flex justify-start">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title gradient-text"
            >
              About Me
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="card"
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                Aspiring DevOps Engineer with a focus on cloud infrastructure, automation, and reliability. I build efficient CI/CD pipelines, manage scalable environments, and recently began exploring Generative AI to enhance workflow automation and productivity.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#e5decf]" />
                    <span className="text-gray-300">4.8+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#e5decf]" />
                    <span className="text-gray-300">Cloud Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#e5decf]" />
                    <span className="text-gray-300">Automation Expert</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="card text-center">
                  <h3 className="text-4xl font-bold text-[#e5decf] mb-2">4.8+</h3>
                  <p className="text-gray-300">Years Experience</p>
                </div>
                <div className="card text-center">
                  <h3 className="text-4xl font-bold text-[#e5decf] mb-2">10+</h3>
                  <p className="text-gray-300">Projects Completed</p>
                </div>
                <div className="card text-center">
                  <h3 className="text-4xl font-bold text-[#e5decf] mb-2">4</h3>
                  <p className="text-gray-300">Certifications</p>
                </div>
                <div className="card text-center">
                  <h3 className="text-4xl font-bold text-[#e5decf] mb-2">100%</h3>
                  <p className="text-gray-300">Client Satisfaction</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding pt-20 scroll-mt-24 flex items-center min-h-[80vh]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title gradient-text"
            >
              Technical Skills
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4 text-white">DevOps Tools</h3>
                <div className="flex flex-wrap">
                  {['Azure DevOps', 'Docker', 'Jenkins', 'Kubernetes', 'GitHub', 'Ansible', 'Terraform', 'Azure Pipelines', 'Azure Repos'].map((skill) => (
                    <span key={skill} className="skill-badge bg-[#e5decf] text-black">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-4 text-white">Cloud Platforms</h3>
                <div className="flex flex-wrap">
                  {['AWS', 'Microsoft Azure', 'EC2', 'VPC', 'EKS', 'IAM', 'S3',
                    'Microsoft Entra ID', 'AKS', 'ACR', 'ECR', 'Azure VMs', 'Azure Vnets', 'Azure Storage'].map((skill) => (
                    <span key={skill} className="skill-badge bg-[#e5decf] text-black">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-4 text-white">Additional Skills</h3>
                <div className="flex flex-wrap">
                  {['VMware', 'Nutanix', 'Commvault', 'Veeam', 'Gen AI', 'LLMs', 'Prompt Engineering', 'Gemini', 'ChatGPT', 'Claude', 'Cursor'].map((skill) => (
                    <span key={skill} className="skill-badge bg-[#e5decf] text-black">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding pt-14 scroll-mt-16 flex items-center min-h-[80vh]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title gradient-text"
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -10 }}
                className="card optimize-animation"
              >
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Image
                    src="/Jenkins.png"
                    alt="CI/CD Pipeline"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">CI/CD Pipeline Implementation</h3>
                <p className="text-gray-300 mb-4">
                  Implemented a comprehensive CI/CD pipeline using Jenkins, Docker, and GitHub. Integrated SonarQube for code quality and Trivy for security scanning.
                </p>
                <div className="flex gap-2">
                  <FaJenkins className="text-2xl text-[#e5decf]" />
                  <FaDocker className="text-2xl text-[#e5decf]" />
                  <FaGithub className="text-2xl text-[#e5decf]" />
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="card optimize-animation"
              >
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Image
                    src="/Kube.png"
                    alt="Azure DevOps"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Azure DevOps Project</h3>
                <p className="text-gray-300 mb-4">
                  Deployed Java applications on Azure Kubernetes Services. Implemented containerization and automated deployment using Azure pipelines.
                </p>
                <div className="flex gap-2">
                  <FaMicrosoft className="text-2xl text-[#e5decf]" />
                  <SiKubernetes className="text-2xl text-[#e5decf]" />
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="card optimize-animation"
              >
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Image
                    src="/Migration.png"
                    alt="Migration Project"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Migration Project</h3>
                <p className="text-gray-300 mb-4">
                  This project helped me to learn migration of Virtual machines from On-Prem environment to Azure Cloud. Also as a part of this project I learnt file share migration (On-Prem to Azure Files)
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="card optimize-animation"
              >
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Image
                    src="/azure.png"
                    alt="Azure Infrastructure Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Handling infrastructure solutions for Azure Cloud</h3>
                <p className="text-gray-300 mb-4">
                  This project helped me to deploy the Azure infrastructure solutions at scale. As part of the project I have to learn how to manage Azure file shares, working with Azure Active Directory, managing the Azure Virtual Machines, Azure file sync, Azure backups and more as part of the project.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-padding pt-20 scroll-mt-24 flex items-center min-h-[80vh]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title gradient-text"
            >
              Certifications
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="card cursor-pointer"
                onMouseMove={handleCertMouseMove}
                onMouseLeave={handleCertMouseLeave}
                onClick={() => handleCertClick('AZ-400_Cert.pdf')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#e5decf]/10 flex items-center justify-center">
                    <Image src="/Microsoft-logo.png" alt="Microsoft Logo" width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Microsoft Azure DevOps Engineer (AZ-400)</h3>
                    <p className="text-gray-300">Microsoft Certified</p>
                  </div>
                </div>
              </div>
              <div
                className="card cursor-pointer"
                onMouseMove={handleCertMouseMove}
                onMouseLeave={handleCertMouseLeave}
                onClick={() => handleCertClick('AZ-104_Cert.pdf')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#e5decf]/10 flex items-center justify-center">
                    <Image src="/Microsoft-logo.png" alt="Microsoft Logo" width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Azure Administrator Associate (AZ-104)</h3>
                    <p className="text-gray-300">Microsoft Certified</p>
                  </div>
                </div>
              </div>
              <div
                className="card cursor-pointer"
                onMouseMove={handleCertMouseMove}
                onMouseLeave={handleCertMouseLeave}
                onClick={() => handleCertClick('DevOps_Training_Cert.pdf')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#e5decf]/10 flex items-center justify-center">
                    <Image src="/intellipaat-logo.png" alt="Intellipaat Logo" width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">DevOps Training</h3>
                    <p className="text-gray-300">Intellipaat</p>
                  </div>
                </div>
              </div>
              <div
                className="card cursor-pointer"
                onMouseMove={handleCertMouseMove}
                onMouseLeave={handleCertMouseLeave}
                onClick={() => handleCertClick('intellipaat-certificate.pdf')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#e5decf]/10 flex items-center justify-center">
                    <Image src="/intellipaat-logo.png" alt="Intellipaat Logo" width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Azure Administrator Course (AZ-103/AZ-104)</h3>
                    <p className="text-gray-300">Intellipaat</p>
                  </div>
                </div>
              </div>
              <div
                className="card cursor-pointer"
                onMouseMove={handleCertMouseMove}
                onMouseLeave={handleCertMouseLeave}
                onClick={() => handleCertClick('Outskill_GenAI_cert.pdf')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#e5decf]/10 flex items-center justify-center">
                    <Image src="/outskill-logo.avif" alt="Outskill Logo" width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Generative AI Mastermind</h3>
                    <p className="text-gray-300">Outskill</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Tooltip for certifications */}
            {tooltip.visible && (
              <div
                style={{
                  position: 'fixed',
                  left: tooltip.x,
                  top: tooltip.y,
                  zIndex: 1000,
                  pointerEvents: 'none',
                  background: 'rgba(0,0,0,0.85)',
                  color: '#e5decf',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                Click to view the certificate
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding pt-20 scroll-mt-24 flex items-center min-h-[80vh]">
        <div className="container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title gradient-text"
            >
              Achievements & Awards
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-20 h-20 rounded-full bg-[#e5decf]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Emerging Star Badge</h3>
                <p className="text-gray-300">Awarded Thrice</p>
              </div>
              <div className="card text-center">
                <div className="w-20 h-20 rounded-full bg-[#e5decf]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🔥</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">On Fire Badge</h3>
                <p className="text-gray-300">For being proactive</p>
              </div>
              <div className="card text-center">
                <div className="w-20 h-20 rounded-full bg-[#e5decf]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Individual Excellence</h3>
                <p className="text-gray-300">Spot Award for problem-solving</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding pt-20 scroll-mt-24 flex items-center min-h-[80vh]">
        <div className="container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title gradient-text"
            >
              Contact Me
            </motion.h2>
            <div className="card">
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="contact-item optimize-animation"
                >
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">Email</h3>
                    <a 
                      href="mailto:writedown2deepak@gmail.com"
                      className="contact-text"
                    >
                      writedown2deepak@gmail.com
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="contact-item optimize-animation"
                >
                  <FaPhone className="contact-icon" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">Phone</h3>
                    <a 
                      href="tel:+91 9952618445"
                      className="contact-text"
                    >
                      +91 9952618445
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 glass-effect">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col justify-center items-center">
            <div className="text-gray-300 mb-0 text-center">
              © 2025 Deepak Radhakrishnan. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 
