export default function Part(props){
    console.log(props)

    return (
    <>    
        <p>
            {props.part} {props.exercises}
        </p>
    </>
    )
}