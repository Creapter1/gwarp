/* Example melody pack. notes = [midi, startBeat, lengthBeats]; 60 = middle C. */
GW_PACK({
  type: "melodies", name: "Starter melodies", by: "Claude", version: 1,
  items: [
    { name: "Level start", genre: "electro", mood: "happy", bpm: 128, bars: 2,
      notes: [[64,0,0.5],[67,0.5,0.5],[71,1,0.5],[72,1.5,1],[71,2.5,0.5],[67,3,0.5],[69,3.5,0.5],[67,4,1],[64,5,1],[62,6,0.5],[64,6.5,1.5]] }
  ]
});
