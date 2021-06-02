# Original version of this script was created by u/sp1ky on r/pathofexiledev
# https://www.reddit.com/r/pathofexiledev/comments/n0q32i/passives_skills_image_api/

import json
from typing import Any, Dict

import requests

JSON_START_TOKEN = 'var passiveSkillTreeData = {'
JSON_END_TOKEN = '};'


def _fetch_passive_tree_page_html() -> str:
    r = requests.get('https://www.pathofexile.com/passive-skill-tree',
                     headers={
                         'User-Agent': 'Meta_Is_Beta passives lookup script',
                         'From': 'Meta.Is.Beta@gmail.com'
                     })
    r.raise_for_status()
    return r.text


def _extract_passive_skill_tree_data(html: str) -> Dict[str, Any]:
    # Find the start and end points of the "passiveSkillTreeData" variable
    # Delegate validation to the JSON parser
    _, _, remaining_html = html.partition(JSON_START_TOKEN)
    js_variable_contents, _, _ = remaining_html.partition(JSON_END_TOKEN)

    # Re-brace the js object and parse as JSON
    return json.loads('{' + js_variable_contents + '}')


def generate_node_mapping() -> Dict[str, str]:
    tree_data = _extract_passive_skill_tree_data(
        _fetch_passive_tree_page_html())

    nodes = []

    for node in tree_data['nodes'].values():
        node_mapping = {}

        if "name" in node and "stats" in node and "icon" in node:
            node_mapping = {
                "reference": node["name"],
                "data": {
                    "sections": {
                        "name": node["name"],
                        "description": node["stats"]
                    }
                },
                "iconUrl": "https://web.poecdn.com/image/" + node["icon"]
            }

            nodeType = ""
            if "ascendancyName" in node:
                nodeType += "ascendancy "
            if "isNotable" in node:
                nodeType += "notable"
            elif "isKeystone" in node:
                nodeType += "keystone"
            else:
                nodeType += "basic"

            node_mapping["data"]["type"] = nodeType

            nodes.append(node_mapping)

    nodesObj = {"passives": nodes}

    with open("passive-node-data.json", 'wt') as fdo:
        json.dump(nodesObj, fdo, indent=2)
    return nodesObj


if __name__ == '__main__':
    generate_node_mapping()
