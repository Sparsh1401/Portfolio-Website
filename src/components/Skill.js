const Skill = ({source, alt, title})  => {
    return(
    <div className="skill-container">
        <div className="img-container"><img src={source} alt={alt} title={title}/></div>
        <h4>{title}</h4>
     </div>
    )
}

export default Skill