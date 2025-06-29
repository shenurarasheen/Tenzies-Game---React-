import "./Die.css"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#EDEFF2"
    }

    return (
        <button onClick={() => props.hold(props.id)} 
        className="die-btn" 
        aria-pressed={props.isHeld}
        aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        style={styles}>{props.value}</button>
    )
}