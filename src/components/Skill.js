import { motion } from 'framer-motion'

const Skill = ({source, alt, title})  => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return(
        <motion.div
            className="skill-container"
            variants={itemVariants}
            whileHover={{
                scale: 1.1,
                y: -10,
                transition: { duration: 0.3 }
            }}
        >
            <div className="img-container">
                <img src={source} alt={alt} title={title}/>
            </div>
            <h4>{title}</h4>
        </motion.div>
    )
}

export default Skill