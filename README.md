# Lerna example repository

[![Build Status](https://travis-ci.org/emmanuelgautier/lerna-example.svg?branch=master)](https://travis-ci.org/emmanuelgautier/lerna-example)

# Config du projet Lerna
voir [lerna.json](https://github.com/hjumeau/lerna-example/blob/master/lerna.json).
Le projet lerna est configuré un mode independent. Ce mode permet à lerna d'exécuter les cmds npm uniquement sur les packages qui ont changés([détails](https://github.com/lerna/lerna#independent-mode---independent)).

# Théorie script travis
Un seul job sur Travis à chaque merge sur master.
Le job fait dans l'ordre, et uniquement pour les packages modifiés:
- Bump de version (package.json, packages/.../package.json)
- Push (le dump de version)
- Create Tag (les tags sont crées mais pas pushé)
- Test
- Publish npm
- Push Tags

# Technique
voir [travis.yml](https://github.com/hjumeau/lerna-example/blob/master/.travis.yml).
voir [all.sh](https://github.com/hjumeau/lerna-example/blob/master/ci/all).
