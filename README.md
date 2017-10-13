# Interface utilisateur de La constituante

Bonjour, et merci de lire ces quelques lignes.

Si vous etes ici, c'est que vous etes curieux, ou que vous souhaitez participer aux efforts de developpements necessaires a la reussite de ce projet democratique.
Dans ce document que vous trouverez quelques indications sur la structure du projet.

La constituante est construite a l'aide du framework Angular4 pour sa partie client, et php pour sa partie serveur.
Pour des raisons de securite, seuls les developpeurs interesses par l'api auront access au code sur demande.

Initialisation de l'application
Pour installer l'application en local suivez les etapes suivantes :
Installer le repertoire puis:
 1- npm install -g @angular/cli
 
aller sur le repertoire installe 

 2- npm install 
 
 3- modifier l'url du serveur pour pointer soit en local soit vers le serveur de developpement
 
 (src\environments\environment.ts)
 
 4- npm run start 

 la commande npm run start executera la commance ng serve qui s'appuie sur angular cli.
 Un serveur NodeJs est demarre sur un port qui vous sera indique sur la ligne de commande
 Vous n'avez qu'a naviger vers http://localhost:XXXX/
 ou XXXX est le port indique par le compilateur
  


Vous pouvez egalement lancer une instance copy exacte de production en local en lancant la commande suivante :

node static/server.js

Cela lancera un serveur NodeJs sur le port 4000 et utilisera l'url de l'api de production. 


Si vous souhaitez nous aider a developper de nouvelles fonctionnalite, rejoignez le projet de La constituante sur Taiga.
https://tree.taiga.io/project/laconstituante-la-constituante/kanban
A partir de Taiga, vous pouvez voir qui travaille sur quoi et les fonctionnalites qui sont en attente de developpement.
 
Une fois que vous avez choisi une histoire (story) a faire, assignez la a vous meme, creez une nouvelle branche depuis la master contenant le numero de la story sur Taiga.
Si la Story est deja en cours de developpement, vous pouvez demander a la personne qui a pris le lead si elle a besoin d'aide.
Si vous vous etes assigne une story et que finalement vous ne pouvez pas la finaliser, remettez la en ready dans Taiga.
 
Si vous avez des question sur le code, vous pouvez ouvrir un incident ici sur gitHub
 
