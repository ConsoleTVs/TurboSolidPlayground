import { Show } from 'solid-js'

const Card = (props) => {
  return (
    <div class="border bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
      <div>{props.children}</div>
      <Show when={props.footer}>
        <div class="bg-slate-50 -mx-6 -mb-6 p-6 border-t">{props.footer}</div>
      </Show>
    </div>
  )
}

export default Card
