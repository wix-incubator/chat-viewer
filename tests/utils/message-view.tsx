import type { TestMessage } from './test-utils';

const MESSAGE_HEIGHT = 32;

export function MessageView({ message }: { message: TestMessage }) {
  return (
    <div
      data-testid="message"
      data-message-id={message.id}
      style={{ height: MESSAGE_HEIGHT }}
    >
      {message.content}
    </div>
  );
}
