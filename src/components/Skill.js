const Skill = ({source, alt, title})  => {
    return(
    <div className="skill-container">
        <img src={source} alt={alt} title={title}/>
     </div>
    )
}

export default Skill