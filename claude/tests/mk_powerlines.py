import json, zipfile, hashlib
bolt = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 60 80"><polygon points="34,0 6,46 28,46 20,80 54,30 32,30 44,0" fill="#4ade80" stroke="#8b5cf6" stroke-width="3"/></svg>'
pole = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="90" viewBox="0 0 40 90"><rect x="17" y="10" width="6" height="80" fill="#8b5cf6"/><rect x="2" y="16" width="36" height="5" fill="#8b5cf6"/><circle cx="5" cy="13" r="3" fill="#4ade80"/><circle cx="35" cy="13" r="3" fill="#4ade80"/></svg>'
bg = '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360"><rect width="480" height="360" fill="#0b0b14"/></svg>'
assets = {}
def cos(name, svg, cx, cy):
    m = hashlib.md5(svg.encode()).hexdigest(); assets[m + '.svg'] = svg
    return {"assetId": m, "name": name, "md5ext": m + ".svg", "dataFormat": "svg", "rotationCenterX": cx, "rotationCenterY": cy}
def sprite(name, blocks, costume, layer, x):
    return {"isStage": False, "name": name, "variables": {}, "lists": {}, "broadcasts": {}, "blocks": blocks, "comments": {}, "currentCostume": 0,
            "costumes": [costume], "sounds": [], "volume": 100, "layerOrder": layer, "visible": True, "x": x, "y": 0, "size": 100, "direction": 90, "draggable": False, "rotationStyle": "all around"}
B = lambda op, **k: dict({"opcode": op, "next": None, "parent": None, "inputs": {}, "fields": {}, "shadow": False, "topLevel": False}, **k)
bolt_blocks = {
 "f1": B("event_whenflagclicked", next="f2", topLevel=True, x=20, y=20),
 "f2": B("control_forever", parent="f1", inputs={"SUBSTACK": [2, "f3"]}),
 "f3": B("event_broadcast", parent="f2", next="f4", inputs={"BROADCAST_INPUT": [1, [11, "zap", "bzap"]]}),
 "f4": B("control_wait", parent="f3", next="f5", inputs={"DURATION": [1, [5, "0.6"]]}),
 "f5": B("procedures_call", parent="f4", inputs={"a1": [1, [10, "10"]]}, mutation={"tagName": "mutation", "children": [], "proccode": "spin %s", "argumentids": "[\"a1\"]", "warp": "false"}),
 "r1": B("event_whenbroadcastreceived", next="r2", topLevel=True, x=20, y=330, fields={"BROADCAST_OPTION": ["zap", "bzap"]}),
 "r2": B("motion_turnright", parent="r1", inputs={"DEGREES": [1, [4, "15"]]}),
 "d1": B("procedures_definition", next="d3", topLevel=True, x=520, y=40, inputs={"custom_block": [1, "d2"]}),
 "d2": B("procedures_prototype", parent="d1", shadow=True, inputs={"a1": [1, "d4"]}, mutation={"tagName": "mutation", "children": [], "proccode": "spin %s", "argumentids": "[\"a1\"]", "argumentnames": "[\"deg\"]", "argumentdefaults": "[\"\"]", "warp": "false"}),
 "d4": B("argument_reporter_string_number", parent="d2", shadow=True, fields={"VALUE": ["deg", None]}),
 "d3": B("motion_turnleft", parent="d1", inputs={"DEGREES": [3, "d5", [4, "10"]]}),
 "d5": B("argument_reporter_string_number", parent="d3", fields={"VALUE": ["deg", None]}),
 "k1": B("event_whenkeypressed", next="k2", topLevel=True, x=520, y=330, fields={"KEY_OPTION": ["space", None]}),
 "k2": B("looks_changeeffectby", parent="k1", fields={"EFFECT": ["COLOR", None]}, inputs={"CHANGE": [1, [4, "25"]]}),
}
pole_blocks = {
 "p1": B("event_whenbroadcastreceived", next="p2", topLevel=True, x=20, y=20, fields={"BROADCAST_OPTION": ["zap", "bzap"]}),
 "p2": B("looks_changeeffectby", parent="p1", fields={"EFFECT": ["COLOR", None]}, inputs={"CHANGE": [1, [4, "10"]]}),
}
stage = {"isStage": True, "name": "Stage", "variables": {}, "lists": {}, "broadcasts": {"bzap": "zap"}, "blocks": {}, "comments": {}, "currentCostume": 0,
         "costumes": [cos("backdrop1", bg, 240, 180)], "sounds": [], "volume": 100, "layerOrder": 0, "tempo": 60, "videoTransparency": 50, "videoState": "on", "textToSpeechLanguage": None}
proj = {"targets": [stage, sprite("Bolt", bolt_blocks, cos("bolt", bolt, 30, 40), 1, -60), sprite("Pole", pole_blocks, cos("pole", pole, 20, 45), 2, 80)],
        "monitors": [], "extensions": [], "meta": {"semver": "3.0.0", "vm": "0.2.0", "agent": "G-Warp power-lines test"}}
with zipfile.ZipFile('powerlines.sb3', 'w') as z:
    z.writestr('project.json', json.dumps(proj))
    for k, v in assets.items(): z.writestr(k, v)
print('ok')
