[**Chat Viewer**](../README.md)

***

# Function: followEveryMessage()

> **followEveryMessage**\<`M`\>(`opts`): [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [lib/follow-strategies.ts:61](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/follow-strategies.ts#L61)

Performs a scroll to the bottom of the chat viewer when a new message is added.
It returns a generic [OnMessagesCallback](../type-aliases/OnMessagesCallback.md) that can be used with the chat viewer.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Parameters

### opts

`ScrollToIndexOpts` = `DEFAULT_SCROLL_OPTS`

[ScrollToItemOpts](../interfaces/ScrollToItemOpts.md) options for controlling the scroll behavior

## Returns

[`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

A callback that performs the scroll action.

## Example

```tsx
<ChatViewer
  messages={messages}
  renderMessage={renderMessage}
  onNewerMessages={followEveryMessage({ smooth: true })}
/>
```
