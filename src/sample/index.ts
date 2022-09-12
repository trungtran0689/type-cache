import {
    HashKeyStrategy,
    FileStorage,
    ExpirationStrategy,
    Cache
} from '../cache'

const cacheKey = new HashKeyStrategy();
const cacheStorage = new FileStorage('.cache');

const cacheStrategy = new ExpirationStrategy(cacheStorage);



class Test {
    @Cache(cacheStrategy, {ttl: 20}, cacheKey)
    async test() {
        return 20;
    }
}
const x = new Test();

x.test().then(data => console.log(data))

