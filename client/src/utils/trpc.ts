import { createTRPCReact } from '@trpc/react-query';
import type { TRPCRouter } from '../../../server/src/router';

export const trpc = createTRPCReact<TRPCRouter>();
