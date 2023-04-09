type Coin = "ETH" | "TRON" | "MATIC";

interface Coins {
  [coin: string]: number;
}

function allocateCoins(
  coins: Coins,
  requests: Array<string>
): Array<Coin> | null {
  const availableCoins = { ...coins };

  const result: Array<Coin> = requests.reduce(
    (acc: Array<Coin>, request: string) => {
      const requestedCoins = request.split("/");

      for (const requestedCoin of requestedCoins) {
        // преобразование типа Request в тип Coin с помощью оператора as
        if (!((requestedCoin as Coin) in availableCoins)) {
          return null;
        }

        if (availableCoins[requestedCoin as Coin] === 0) {
          // если запрашиваемой монеты нет в наличии, проверяем следующую монету из запроса
          continue;
        }

        // вычитаем одну монету из общего числа доступных монет и добавляем в результат
        availableCoins[requestedCoin as Coin]--;

        acc.push(requestedCoin as Coin);
        break;
      }

      return acc;
    },
    []
  );

  // проверка, что все запросы были выполнены
  if (result.length !== requests.length) {
    return null;
  }

  return result;
}
