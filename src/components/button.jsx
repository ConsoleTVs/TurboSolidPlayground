import { mergeProps, splitProps } from 'solid-js'

const Button = (props) => {
  props = mergeProps(props, {
    class:
      'bg-blue-800 text-white px-4 py-1 rounded-lg tracking-wide uppercase text-sm leading-loose font-bold',
  })
  const [local, others] = splitProps(props, ['children'])

  return <button {...others}>{local.children}</button>
}

export default Button
