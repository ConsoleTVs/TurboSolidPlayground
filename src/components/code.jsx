import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css'
import { onMount } from 'solid-js'

const Code = (props) => {
  let element = undefined

  onMount(() => {
    if (element) hljs.highlightElement(element)
  })

  return (
    <pre>
      <code
        ref={element}
        class="language-jsx !p-0 text-sm max-h-96">
        {props.children}
      </code>
    </pre>
  )
}

export default Code
