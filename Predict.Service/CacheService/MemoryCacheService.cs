using Microsoft.Extensions.Caching.Memory;
using Predict.Service.CacheServicel;

namespace Predict.Service.CacheService;

public class MemoryCacheService(IMemoryCache cache) : ICacheService
{

    public T GetOrSet<T>(
        string key,
        Func<T> factory,
        TimeSpan? absoluteExpiration = null)
    {
        if (cache.TryGetValue(key, out T value)) return value;

        value = factory();

        var options = new MemoryCacheEntryOptions();
        if (absoluteExpiration.HasValue)
            options.SetAbsoluteExpiration(absoluteExpiration.Value);

        cache.Set(key, value, options);
        return value;
    }

    public async Task<T> GetOrSetAsync<T>(
        string key,
        Func<Task<T>> factory,
        TimeSpan? absoluteExpiration = null)
    {
        if (cache.TryGetValue(key, out T value))
            return value;

        value = await factory();

        var options = new MemoryCacheEntryOptions();
        if (absoluteExpiration.HasValue)
            options.SetAbsoluteExpiration(absoluteExpiration.Value);

        cache.Set(key, value, options);
        return value;
    }

    public void Remove(string key)
    {
        cache.Remove(key);
    }
}