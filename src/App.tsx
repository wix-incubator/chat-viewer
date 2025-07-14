import { useCallback, useMemo, useRef, useState } from 'react';
import { faker } from '@faker-js/faker';
import { ChatViewer, ChatViewerHandle, followEveryMessage, followMessagesAtBottom, followMessagesBy, OnMessagesCallback } from '../lib'
import classes from './App.module.css'

const WIX_ICON = 'https://simpleicons.org/icons/wix.svg';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  name?: string;
  userpic: string;
}

type FollowStrategy = 'always' | 'never' | 'at-bottom' | 'only-received';

function userMessage(): Message {
  const sex = faker.person.sexType();

  return {
    id: faker.string.alphanumeric(10),
    role: 'user',
    content: faker.lorem.sentences({ min: 1, max: 10 }),
    name: faker.person.firstName(sex),
    userpic: faker.image.personPortrait({ sex }),
  }
}

function assistantMessage(): Message {
  return {
    id: faker.string.alphanumeric(10),
    role: 'assistant',
    content: faker.lorem.sentence(),
    name: "Wix AI Assistant",
    userpic: WIX_ICON,
  }
}

function randomMessage(): Message {
  const role = faker.helpers.arrayElement(['user', 'assistant']);
  return role === 'user' ? userMessage() : assistantMessage();
}

function generateMessages(n: number): Message[] {
  return Array.from({ length: n }, () => randomMessage());
}

function Message(props: Message) {
  return (
    <div
      key={props.id}
      tabIndex={0}
      className={[classes.message, classes[props.role]].join(' ')}
    >
      <img className={classes.userpic} src={props.userpic} alt={`${props.role} avatar`} />
      <div className={classes.bubble}>
        <strong>{props.name}</strong>
        <p>{props.content}</p>
      </div>
    </div>
  );
}

function Loader() {
  return <div className={classes.loader}>Loading...</div>;
}

function App() {
  const chatRef = useRef<ChatViewerHandle<Message>>(null);
  const [messages, setMessages] = useState<Message[]>(generateMessages(10));
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const [wide, setWide] = useState(true);
  const [tall, setTall] = useState(true);
  const [followStrategy, setFollowStrategy] = useState<FollowStrategy>('always');

  const styles = useMemo(() => ({
    width: wide ? '100%' : '60%',
    height: tall ? '100%' : '60%',
    backgroundColor: '#fefefe',
    border: '1px solid #ddd',
  }), [wide, tall]);

  const onNewMessages = useMemo<OnMessagesCallback<Message>>(() => {
    switch (followStrategy) {
      case 'always':
        return followEveryMessage();
      case 'never':
        return () => {};
      case 'at-bottom':
        return followMessagesAtBottom();
      case 'only-received':
        return followMessagesBy((message) => message.role === 'assistant');
      default:
        return () => {};
    }
  }, [followStrategy])

  const prependMessages = (n: number) => setMessages((prev) => [...generateMessages(n), ...prev]);
  const appendMessages = (n: number) => setMessages((prev) => [...prev, ...generateMessages(n)]);

  const loadHistory = useCallback(() => {
    if (isLoadingHistory) return;
    setIsLoadingHistory(true);

    setTimeout(() => {
      prependMessages(10);
      setIsLoadingHistory(false);
    }, 1000); // Simulate network delay
  }, [isLoadingHistory]);

  return (
    <div className={classes.body}>
      <div className={classes.toolbar}>
        <div className={classes.group}>
          <strong>Dimensions</strong>
          <div className={classes.field}>
            <p>width</p>
            <button onClick={() => setWide(!wide)}>
              {wide ? 'Narrow' : 'Wide'}
            </button>
          </div>
          <div className={classes.field}>
            <p>height</p>
            <button onClick={() => setTall(!tall)}>
              {tall ? 'Short' : 'Tall'}
            </button>
          </div>
        </div>
        

        <div className={classes.group}>
          <strong>Messages</strong>
          <div className={classes.field}>
            <p>prepend</p>
            <button onClick={() => prependMessages(1)}>
              1
            </button>
            <button onClick={() => prependMessages(10)}>
              10
            </button>
            <button onClick={() => prependMessages(1000)}>
              1000
            </button>
          </div>
          <div className={classes.field}>
            <p>append</p>
            <button onClick={() => appendMessages(1)}>
              1
            </button>
            <button onClick={() => appendMessages(10)}>
              10
            </button>
            <button onClick={() => appendMessages(1000)}>
              1000
            </button>
          </div>
          <div className={classes.field}>
            <p>clear</p>
            <button onClick={() => setMessages([])}>
              Clear
            </button>
          </div>
        </div>
        
        <div className={classes.group}>
          <strong>Logic</strong>
          <div className={classes.field}>
            <p>follow new messages</p>
            <select
              value={followStrategy}
              onChange={(e) => setFollowStrategy(e.target.value as FollowStrategy)}
            >
              <option value="always">Always</option>
              <option value="never">Never</option>
              <option value="at-bottom">At bottom</option>
              <option value="only-received">Only received</option>
            </select>
          </div>
        </div>

        <div className={classes.group}>
          <strong>Actions</strong>
          <div className={classes.field}>
            <p>jump to</p>
            <button onClick={() => chatRef.current?.scrollToTop()}>
              Top
            </button>
            <button onClick={() => chatRef.current?.scrollToBottom()}>
              Bottom
            </button>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <ChatViewer<Message>
          ref={chatRef}
          style={styles}
          overscan={10}
          messages={messages}
          renderMessage={(message) => <Message {...message} />}
          onNewerMessages={onNewMessages}
          prefix={isLoadingHistory ? <Loader /> : null}
          historyEndOffset={100}
          onHistoryEndReached={loadHistory}
        />
      </div>
      <div className={classes.debug}>
        <strong>Items (index: id)</strong>
        <pre>
          {messages.map((msg, idx) => (
            <div key={msg.id}>
              {idx}: {msg.id}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export default App
