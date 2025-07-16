[**Chat Viewer**](../README.md)

***

# Function: followMessagesBy()

> **followMessagesBy**\<`M`\>(`shouldFollow`, `opts`): [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [lib/follow-strategies.ts:118](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/follow-strategies.ts#L118)

Performs a scroll to the bottom of the chat when a message matches the provided condition.
This is useful for following specific messages that meet a certain criteria, such as mentions or keywords.
Typical behavior of the chat apps is to scroll to the bottom when a new message arrives, but only if the user is already at the bottom of the chat.
When user scrolls up to view older messages, it will not scroll automatically.
When browsing messages history chat apps usually scroll to the bottom only when user sends a new message.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Parameters

### shouldFollow

(`message`) => `boolean`

### opts

`ScrollToIndexOpts` = `DEFAULT_SCROLL_OPTS`

## Returns

[`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

## Example

```tsx
<ChatViewer
  messages={messages}
  renderMessage={renderMessage}
  onNewerMessages={followMessagesBy(
    (message => message.type === 'mention'
  )}
/>

@param shouldFollow - A function that determines if any of the received messages should trigger a scroll action.
@param opts - {@link ScrollToItemOpts} options for controlling the scroll behavior
@returns {OnMessagesCallback<M>} A callback that performs the scroll action.
