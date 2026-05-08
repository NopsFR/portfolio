'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/portfolio';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export function Projects() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 px-4 relative">
      <Container>
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Projects
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A selection of projects showcasing my skills in development and
            cybersecurity
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="h-full flex flex-col"
                glow={project.featured ? 'pink' : 'none'}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <Badge variant="pink" size="sm">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="default" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto flex-wrap">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(project.githubUrl, '_blank')
                      }
                      leftIcon={<FaGithub />}
                    >
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      leftIcon={<FaExternalLinkAlt />}
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              window.open('https://github.com/NopsFR', '_blank')
            }
            leftIcon={<FaGithub />}
          >
            View All Projects on GitHub
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}