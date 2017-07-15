# Interface utilisateur de La constituante

Bonjour, et merci de lire ces quelques lignes.

Si vous etes ici, c'est que vous etes curieux, ou que vous souhaitez participer aux efforts de developpements necessaires a la reussite de ce projet democratique.
Dans ce document que vous trouverez quelques indications sur la structure du projet.

La constituante est construite a l'aide du framework Angular4 pour sa partie client, et php pour sa partie serveur.
Pour des raisons de securite, seuls les developpeurs interesses par l'api auront access au code sur demande.

---Init the app
Pour installer l'application en local suivez les etapes suivantes :
 1- Installer le repertoire
 2- npm install 
 3- npm start
 ---------
 la commande npm start lance la compilation du projet et lance un serveur NodeJS sur le port 4000
 Vous pouvez a ce stade lancer le fichier index.html directement ou bien depuis un serveur.
  
--Server Side rendering -- 
NodeJs ne fonctionnera pas car le fichier serveur.js fait appel a l'objet document qui cause une erreur lors de l'execution.
Pour corrigier ce probleme, la seule solution est de modifier manuellement le fichier serveur.js afin d'encapsuler l'usage de l'objet document dans une condition du type if(typeof document === 'object'){  //code utilisant document }
 ---------
 Si vous souhaitez nous aider a developper de nouvelles fonctionnalite, rejoignez le projet de La constituante sur Taiga.
 A partir de Taiga, vous pouvez voir qui travaille sur quoi et les fonctionnalites qui sont en attente de developpement.
 
 Une fois que vous avez choisi une histoire (story) a faire, assignez la a vous meme, creez une nouvelle branche depuis la master contenant le numero de la story sur Taiga.
 Si la Story est deja en cours de developpement, vous pouvez demander a la personne qui a pris le lead si elle a besoin d'aide.
 Si vous vous etes assigne une story et que finalement vous ne pouvez pas la finaliser, remettez la en ready dans Taiga.
 
 Si vous avez des question sur le code, vous pouvez ouvrir un incident ici sur gitHub
 
