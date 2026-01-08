namespace Predict.Service.CacheServicel;

public interface ICacheService
{
    T GetOrSet<T>(string key, Func<T> factory, TimeSpan? absoluteExpiration = null);

    Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan? absoluteExpiration = null);

    void Remove(string key);
}