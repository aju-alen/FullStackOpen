export default function Footer(props){

    console.log(props)
        return(
            <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} </p>
        )
    }