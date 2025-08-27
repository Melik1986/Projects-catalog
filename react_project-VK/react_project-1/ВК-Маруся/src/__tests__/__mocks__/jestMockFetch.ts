// Универсальный jest-мок для fetch с возможностью подмены ответов
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function jestMockFetch(response: unknown, ok = true, status = 200) {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      headers: { get: () => 'application/json' },
    }),
  );
}
