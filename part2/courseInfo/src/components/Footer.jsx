export default function Footer({ course }) {
    const total = course.parts.reduce((a, b) =>   a + b.exercises
    ,0)
    return (
        <h2>total of {total} exercises</h2>
    )
}