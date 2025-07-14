# Wix Chat Viewer

A library for rendering chats with virtualization.

## Features

* Virtualization of messages by [virtua](https://github.com/inokawa/virtua) library.
* Ability to build complex logic for scrolling to new/old messages.
* Tracking seen/unseen messages.
* Tracking messages in viewport.
* Scrolling to items by ids/indexes, offset, etc.
* Displaying suffixes and prefixes (i.e. history loaders, typing indicators).
* Items can be animated.
* Items can be stateful. You can keep them in the DOM thus preserving their state.

## Installation

Install with your favorite package manager like `npm`, `yarn` or `pnpm`:

```sh
npm install chat-viewer
```

## Usage

Here is a simplified example of a chat:

```tsx
import React from 'react';
import {ChatViewer, ChatViewerHandle, followMessagesBy} from 'chat-viewer';

interface Message {
  id: string; // Note: id is a required property for a message object
  role: 'user' | 'assistant';
  content: string;
}

function Message(props: Message) {
  return (
    <div key={props.id}>
      <strong>{props.role}</strong>
      <p>{props.content}</p>
    </div>
  );
}

interface ChatProps {
  messages: Message[];
}

function Chat({ messages }: ChatProps) {
  const chatRef = useRef<ChatViewerHandle<Message>>(null);

  const loadHistory = useCallback(() => {
    // loading history logic
  }, [/* .. */])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ChatViewer<Message>
        ref={chatRef}
        messages={messages}
        renderMessage={
          (message) => <Message {...message} />
        }
        onNewerMessages={
          // This will scroll to new messages when you are at the bottom of the chat
          // and incoming message is written by 'assistant' role
          followMessagesBy((message) => message.role === 'assistant')
        }
        // When 100 offset from the top of the chat is reached, then loadHistory is triggered
        historyEndOffset={100}
        onHistoryEndReached={loadHistory}
      />
    </div>
  )
}
```

## API Reference

Please read our docs for the API here:

[**📑 API Reference**](./docs)

## License

MIT © Wix.com
