import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projectsData } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="text-emerald-500 hover:underline"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate("/#projects")}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </motion.button>

                        {/* Project Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="text-emerald-500 text-sm font-medium uppercase tracking-wider">
                                {project.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
                                {project.title}
                            </h1>
                            {project.award && (
                                <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm mb-6">
                                    🏆 {project.award}
                                </div>
                            )}
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-2 mb-8"
                        >
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-invert max-w-none mb-8"
                        >
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </motion.div>

                        {/* Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-4 mb-12"
                        >
                            {project.link && project.link !== "#" && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-full hover:shadow-lg transition-all"
                                >
                                    <Github className="w-4 h-4" />
                                    View on GitHub
                                </a>
                            )}
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 glass border border-white/10 font-semibold rounded-full hover:bg-white/5 transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                        </motion.div>

                        {/* Detailed Content Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-8"
                        >
                            {project.content && (
                                <>
                                    {project.content.overview && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {project.content.overview}
                                            </p>
                                        </div>
                                    )}

                                    {project.content.challenges && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Challenges</h2>
                                            <ul className="space-y-2 text-muted-foreground">
                                                {project.content.challenges.map((challenge, idx) => (
                                                    <li key={idx} className="flex gap-3">
                                                        <span className="text-emerald-500 mt-1">→</span>
                                                        <span>{challenge}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {project.content.solutions && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Solutions</h2>
                                            <ul className="space-y-2 text-muted-foreground">
                                                {project.content.solutions.map((solution, idx) => (
                                                    <li key={idx} className="flex gap-3">
                                                        <span className="text-emerald-500 mt-1">✓</span>
                                                        <span>{solution}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {project.content.results && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Results</h2>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {project.content.results}
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProjectDetail;
