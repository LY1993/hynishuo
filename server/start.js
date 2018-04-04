require("shelljs/global");
// var OriIndex= require("./app.js");
// OriIndex.doit();
// if (!which('git')) {
// 	echo('Sorry, this script requires git');
// 	exit(1);
// }

// mkdir('-p', 'out/Release');
// cp('-R', 'stuff/*', 'out/Release');

// cd('lib');
// ls('*.js').forEach(function(file) {
// 	sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
// 	sed('-i', /.*REMOVE_THIS_LINE.*\n/, '', file);
// 	sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, cat('macro.js'), file);
// });
// cd('..');

// if (exec('git commit -am "Auto-commit"').code !== 0) {
// 	echo('Error: Git commit failed');
// 	exit(1);
// }
exec('chmod +x ./startmongo.sh')  //使脚本具有执行权限
exec('./startmongo.sh')  //执行脚本