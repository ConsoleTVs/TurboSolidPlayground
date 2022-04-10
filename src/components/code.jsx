import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/xcode.css'
import { onMount } from 'solid-js'
import js from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('javascript', js)
hljs.registerLanguage('xml', xml)

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
