// Test script for the PMP loader.
// Run this in the browser console after loading app.html.
// It assumes you have already loaded deepseek/pmp-loader.js.
(async function testPmpLoader() {
  console.log('--- PMP Loader Test ---');
  // 1. Test detect() with a fake ZIP header
  const fakeZip = new Uint8Array([0x50, 0x4B, 0x03, 0x04]).buffer;
  console.log('detect(fakeZip) =', window.GW_PMP.detect(fakeZip)); // "zip"
  // 2. Test detect() with a non-ZIP buffer
  const fakeProto = new Uint8Array([0x08, 0x01, 0x12, 0x03]).buffer;
  console.log('detect(fakeProto) =', window.GW_PMP.detect(fakeProto)); // "protobuf"
  // 3. Test detect() with null
  console.log('detect(null) =', window.GW_PMP.detect(null)); // "unknown"
  // 4. Test toProjectJson() error handling for a bad buffer
  try {
    await window.GW_PMP.toProjectJson(new Uint8Array([0x00]).buffer);
  } catch (e) {
    console.log('toProjectJson(bad buffer) threw:', e.message);
  }
  // 5. If you have a real .pmp ArrayBuffer, test it here:
  // const realBuffer = /* ArrayBuffer from a file input */;
  // try {
  //   const { json, assets } = await window.GW_PMP.toProjectJson(realBuffer);
  //   console.log('Real project JSON:', json);
  //   console.log('Real assets count:', assets.size);
  // } catch (e) {
  //   console.error('Real project failed:', e.message);
  // }
  console.log('--- Test complete ---');
})();
