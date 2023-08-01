import './about.css'
import { PIC_LANDING } from "../../../Constants"; 

const About = () => {
    return (
    <div className="card-home">
        <div id="about-container">
            <img className="landing-pic" src={PIC_LANDING} />
            <h2 className="about-title-header">
            <button data-text="Awesome" className="button">
    <span className="actual-text">&nbsp;ThermoBox&nbsp;</span>
    <span className="hover-text" aria-hidden="true">&nbsp;ThermoBox&nbsp;</span>
</button></h2>
            <p className="about-text">
               
                Welcome to our online store, where we offer a wide range of high-quality thermo boxes designed to revolutionize the way you store and transport food.
                Whether you're a busy professional who needs to keep your meals fresh during long workdays or a passionate foodie looking to preserve the flavors of your culinary creations, our thermo boxes are the perfect solution.
                <br />
            </p>
        </div>
        </div>
    )
}

export default About