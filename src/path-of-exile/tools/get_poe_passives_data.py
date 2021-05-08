# Original version of this script was created by u/sp1ky on r/pathofexiledev
# https://www.reddit.com/r/pathofexiledev/comments/n0q32i/passives_skills_image_api/

import json
from typing import Any, Dict

import requests

JSON_START_TOKEN = 'var passiveSkillTreeData = {'
JSON_END_TOKEN = '};'
CACHE_FILENAME = 'node_icon_mapping.json'


def _fetch_passive_tree_page_html() -> str:
    r = requests.get('https://www.pathofexile.com/passive-skill-tree',
                     headers={
                         'User-Agent':
                         'Meta_Is_Beta passive icon lookup by name script',
                         'From': 'Meta_Is_Beta@Meta_Is_Beta.com'
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


def get_icon_mapping() -> Dict[str, str]:
    try:
        # Load from cache file if possible
        with open(CACHE_FILENAME, 'rt') as fdi:
            return json.load(fdi)
    except FileNotFoundError:
        # Fetch the latest skill tree, build the mapping then cache to file
        tree_data = _extract_passive_skill_tree_data(
            _fetch_passive_tree_page_html())
        name_to_icon_mapping = {
            node['name']: node['icon']
            for node in tree_data['nodes'].values()
            if 'name' in node and 'icon' in node
        }
        with open(CACHE_FILENAME, 'wt') as fdo:
            json.dump(name_to_icon_mapping, fdo, indent=2)
        return name_to_icon_mapping


if __name__ == '__main__':
    icon_mapping = get_icon_mapping()
    assert icon_mapping.get('Chaos Innoculation') is None
    assert icon_mapping.get('Chaos Inoculation').endswith(
        'KeystoneChaosInoculation.png')
    assert icon_mapping.get('Fettle').endswith(
        'IncreasedMaximumLifeNotable.png')
    assert icon_mapping.get('Annihilation').endswith('Annihilation.png')
