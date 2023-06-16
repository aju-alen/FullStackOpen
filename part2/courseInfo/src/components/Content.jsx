import Part from "./Part"
export default function Content(props){
      const render = props.parts.map(part=>(
            <div key={part.id}>
            <Part details={part} />
            </div>
      ))
    return (
    <> 
      {render}           
    </>
    )
}