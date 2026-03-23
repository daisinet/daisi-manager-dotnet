/**
 * Helpers for packing/unpacking protobuf Any messages in the browser.
 */

import type { Any } from '@daisi/sdk-protobuf-any';

const TYPE_PREFIX = 'type.googleapis.com/';

export interface MessageFns<T> {
  encode(message: T): { finish(): Uint8Array };
  decode(input: Uint8Array): T;
}

/** Pack a message into a protobuf Any (equivalent to C# Any.Pack). */
export function packAny<T>(typeName: string, message: T, messageFns: MessageFns<T>): Any {
  return {
    typeUrl: `${TYPE_PREFIX}${typeName}`,
    value: messageFns.encode(message).finish(),
  };
}

/** Unpack a protobuf Any into a typed message (equivalent to C# Any.Unpack). */
export function unpackAny<T>(any: Any | undefined, messageFns: MessageFns<T>): T | null {
  if (!any || !any.typeUrl || !any.value || any.value.length === 0) return null;
  return messageFns.decode(any.value);
}

/** Get the short type name from an Any's typeUrl. */
export function getTypeName(any: Any | undefined): string {
  if (!any?.typeUrl) return '';
  const idx = any.typeUrl.lastIndexOf('/');
  return idx >= 0 ? any.typeUrl.substring(idx + 1) : any.typeUrl;
}
