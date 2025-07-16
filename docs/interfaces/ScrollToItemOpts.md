[**API Reference**](../README.md)

***

# Interface: ScrollToItemOpts

Defined in: [lib/types.ts:93](https://github.com/wix-incubator/chat-viewer/blob/2fbf016d3c8ddf9c67df1f283a6f305bdb2c2dc5/lib/types.ts#L93)

Options for scrolling to a specific index or message in the chat viewer.

## See

https://github.com/inokawa/virtua#scrolltoindex

## Properties

### align?

> `optional` **align**: `ScrollToIndexAlign`

Defined in: node\_modules/virtua/lib/core/types.d.ts:22

Alignment of the item. Can be:
  - `start`: Align the item to the start of the list.
  - `center`: Align the item to the center of the list.
  - `end`: Align the item to the end of the list.
  - `nearest`: If the item is already completely visible, don't scroll. Otherwise scroll until it becomes visible.
  Default: `"start"`.

***

### offset?

> `optional` **offset**: `number`

Defined in: node\_modules/virtua/lib/core/types.d.ts:33

Additional offset from the scrolled position. Default: `0`.

***

### smooth?

> `optional` **smooth**: `boolean`

Defined in: node\_modules/virtua/lib/core/types.d.ts:28

If true, scrolling animates smoothly. Use with caution for performance. Default: `false`.
