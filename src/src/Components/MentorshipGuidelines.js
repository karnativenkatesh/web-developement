import React from "react";
import Navbar1 from "./Navbar1.js";
import './MentorshipGuidelines.css'
import { MentorGuidelines } from "./MentorGuidelines.js";
import { MenteeGuidelines } from "./MenteeGuidelines.js";
import ApplyGuidelines from "./ApplyGuidelines.js";

function MentorshipGuidelines() {    
return (
	<div className="backg-mg"> 
        <Navbar1 />
        
        <h1 className="h1--guidelines">Mentor Guidelines</h1>
        <p className="p--guidelines">Being a great mentor doesn’t have to be hard, but it can be a bit confusing to get started. Below are some of the ways you can go from a good mentor to a great mentor.</p>

        <div className="accordion">
            {MentorGuidelines.map(({ title, content }) => (
            <ApplyGuidelines title={title} content={content} />
            ))}
        </div>

        <br/>

        <h1 className="h1--guidelines">Mentee Guidelines</h1>
        <p className="p--guidelines">Congratulations on taking the first step to being a mentee! Here are some guidelines for how to be a great mentee and get the most out of our mentorship.</p>

        <div className="accordion">
            {MenteeGuidelines.map(({ title, content }) => (
            <ApplyGuidelines title={title} content={content} />
            ))}
        </div>

        <br/><br/>
    </div>
    );
}

export default MentorshipGuidelines;