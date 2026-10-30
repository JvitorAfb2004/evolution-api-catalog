import type { BinaryNode } from 'baileys';
import { isJidGroup, proto } from 'baileys';

/**
 * Binary nodes WhatsApp requires around interactive content (buttons / list).
 * Baileys does not emit them, so the recipient client downgrades the message to
 * plain text or "unsupported message" even though the proto is valid.
 * Node tree mirrors the one the official client sends (see baileys_helper getButtonArgs).
 *
 * Usage: await client.relayMessage(jid, content, { messageId, additionalNodes: interactiveRelayNodes(jid, content) });
 */
export function interactiveRelayNodes(jid: string, content: proto.IMessage): BinaryNode[] {
  const biz = bizNodeFor(content);

  if (!biz) {
    return [];
  }

  // Private chats only render the flow when the bot node is present; groups reject it.
  return isJidGroup(jid) ? [biz] : [biz, BOT_NODE];
}

const BOT_NODE: BinaryNode = { tag: 'bot', attrs: { biz_bot: '1' } };

function bizNodeFor(content: proto.IMessage): BinaryNode | undefined {
  const nativeFlow = content?.interactiveMessage?.nativeFlowMessage;
  const firstButton = nativeFlow?.buttons?.[0]?.name;

  if (firstButton === 'payment_info' || firstButton === 'review_and_pay') {
    // Payment flows take the flow name as a flat attribute instead of a child node.
    return {
      tag: 'biz',
      attrs: { native_flow_name: firstButton === 'review_and_pay' ? 'order_details' : firstButton },
    };
  }

  if (nativeFlow) {
    return {
      tag: 'biz',
      attrs: {},
      content: [
        {
          tag: 'interactive',
          attrs: { type: 'native_flow', v: '1' },
          content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }],
        },
      ],
    };
  }

  if (content?.listMessage) {
    return {
      tag: 'biz',
      attrs: {},
      content: [{ tag: 'list', attrs: { v: '2', type: 'product_list' } }],
    };
  }

  return undefined;
}
