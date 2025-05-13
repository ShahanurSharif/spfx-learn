import {assert} from 'chai';
import {describe, it} from 'mocha';
import HelloWorldWebPart from '../src/webparts/helloWorld/HelloWorldWebPart';

describe('HelloWorldWebPart', () => {
    it('should initialize showWelcomeMessage as true', async () => {
        const webPart = new HelloWorldWebPart();
        await webPart.onInit();
        assert.isTrue(webPart['properties'].showWelcomeMessage, 'showWelcomeMessage should be initialized as true');
    });
});