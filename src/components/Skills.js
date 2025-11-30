import SkillsDeck from './SkillsDeck'
import { motion } from 'framer-motion'

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="skills">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Technical Skills
            </motion.h1>

            <motion.div
                className="skills-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <SkillsDeck
                    title="Languages"
                    skills={[
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", alt: "Go", title: "Go" },
                        { source: "https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/java/java-original-wordmark.svg", alt: "Java", title: "Java" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript", title: "JavaScript" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", title: "Python" },
                    ]}
                />

                <SkillsDeck
                    title="Frontend"
                    skills={[
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg", alt: "React", title: "React.js" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js", title: "Next.js" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg", alt: "Webpack", title: "Webpack" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", alt: "Redux", title: "Redux" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg", alt: "Material UI", title: "Material UI" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg", alt: "TailwindCSS", title: "Tailwind CSS" },
                    ]}
                />

                <SkillsDeck
                    title="Backend & Databases"
                    skills={[
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original-wordmark.svg", alt: "Spring Boot", title: "Spring Boot" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg", alt: "PostgreSQL", title: "PostgreSQL" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg", alt: "MySQL", title: "MySQL" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original-wordmark.svg", alt: "Redis", title: "Redis" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original-wordmark.svg", alt: "Kafka", title: "Apache Kafka" },
                    ]}
                />

                <SkillsDeck
                    title="Cloud & Tools"
                    skills={[
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "GCP", title: "GCP" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS", title: "AWS" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg", alt: "Docker", title: "Docker" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain-wordmark.svg", alt: "Kubernetes", title: "Kubernetes" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg", alt: "Git", title: "Git" },
                        { source: "https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/graphql/graphql-plain.svg", alt: "GraphQL", title: "GraphQL" },
                        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg", alt: "Node JS", title: "Node.js" },
                    ]}
                />
            </motion.div>
        </div>
    )
}

export default Skills