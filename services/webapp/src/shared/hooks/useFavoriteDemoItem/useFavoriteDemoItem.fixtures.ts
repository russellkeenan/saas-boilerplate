import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import { OperationDescriptor } from 'react-relay/hooks';
import UseFavoriteDemoItemListQuery from '../../../__generated__/useFavoriteDemoItemListQuery.graphql';

export const generateRelayEnvironment = (itemId: string | null = 'item-1', relayEnv: RelayMockEnvironment | null = null) => {
  const env = relayEnv || createMockEnvironment();
  env.mock.queueOperationResolver((operation: OperationDescriptor) =>
    MockPayloadGenerator.generate(operation, {
      ContentfulDemoItemFavoriteType: () => (itemId ? { item: { pk: itemId } } : {}),
    })
  )
  env.mock.queuePendingOperation(UseFavoriteDemoItemListQuery, {});
  return env;
}
