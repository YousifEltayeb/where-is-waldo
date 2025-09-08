const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const fetchGames = () =>
  fetch(SERVER_URL + '/games', {
    method: 'GET',
    mode: 'cors',
  }).then((res) => res.json());

export const createRound = (gameId: string) =>
  fetch(SERVER_URL + '/rounds', {
    method: 'POST',
    mode: 'cors',
    body: new URLSearchParams({ gameId }),
  }).then((res) => res.json());

export const createHit = (hitObj: {
  charId: string;
  xPos: string;
  yPos: string;
}) =>
  fetch(SERVER_URL + '/rounds', {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: new URLSearchParams({
      characterId: hitObj.charId,
      xCoordinate: hitObj.xPos,
      yCoordinate: hitObj.yPos,
    }),
  });
