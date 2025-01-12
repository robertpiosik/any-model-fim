import React, { useState, useRef, useEffect } from 'react'
import styles from './ChatInput.module.scss'

type Props = {
  on_submit: (instruction: string) => void
  on_instruction_change: (instruction: string) => void
  initial_instruction: string
  web_chat_name: string
}

const ChatInput: React.FC<Props> = (props) => {
  const [instruction, set_instruction] = useState(props.initial_instruction)
  const textarea_ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textarea_ref.current) {
      textarea_ref.current.focus()
      textarea_ref.current.select()
    }
  }, [])

  const handle_input_change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    set_instruction(e.target.value)
    props.on_instruction_change(e.target.value)
  }

  const handle_submit = () => {
    props.on_submit(instruction)
  }

  const handle_key_down = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handle_submit()
    }
  }

  const handle_focus = () => {
    if (textarea_ref.current) {
      textarea_ref.current.select()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles['chat-input']}>
        <textarea
          ref={textarea_ref}
          placeholder="Enter instruction..."
          value={instruction}
          onChange={handle_input_change}
          onKeyDown={handle_key_down}
          onFocus={handle_focus}
          autoFocus
        />
        <button onClick={handle_submit}>
          Continue in {props.web_chat_name}
        </button>
      </div>
      <div className={styles['browser-extension-message']}>
        <p>
          Your default browser will load with {props.web_chat_name} page. Paste
          your clipboard manually or for a seamless experience, consider
          automating chat initialization by installing the Gemini Coder
          Connector:
        </p>
        <ul>
          <li>
            <a href="https://chromewebstore.google.com/detail/gemini-coder-connector/ljookipcanaglfaocjbgdicfbdhhjffp">
              Install for Chrome
            </a>
          </li>
          <li>
            <a href="https://addons.mozilla.org/en-US/firefox/addon/gemini-coder-connector/">
              Install for Firefox
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.footer}>
        <div>
          <a href="https://github.com/robertpiosik/gemini-coder">
            Star on GitHub
          </a>
        </div>
        <div>
          <a href="https://buymeacoffee.com/robertpiosik">Buy me a coffee</a>
        </div>
        <div>
          <a href="https://github.com/robertpiosik/gemini-coder/discussions">
            Send feedback
          </a>
        </div>
        <br />
        <div>
          <a href="https://x.com/robertpiosik">Follow on X for updates</a>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
