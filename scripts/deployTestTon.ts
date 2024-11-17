import { toNano } from '@ton/core';
import { TestTon } from '../wrappers/TestTon';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const testTon = provider.open(
        TestTon.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('TestTon')
        )
    );

    await testTon.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(testTon.address);

    console.log('ID', await testTon.getID());
}
