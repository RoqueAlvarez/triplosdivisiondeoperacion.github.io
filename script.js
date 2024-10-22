const mostrarPasos = (pasos) => {
        const contenedor = document.getElementById('pasos');
        contenedor.innerHTML = '';
        pasos.forEach((paso, indice) => {
            const div = document.createElement('div');
            div.classList.add('alert', 'alert-info');
            div.innerText = ` ${indice + 1}: ${paso}`;
            contenedor.appendChild(div);
        });
    };

    const calcular = () => {
        const expresion = document.getElementById('expresion').value || "3 + 5 * (2 * 3 - 4)";
        const pasos = [];
        
        try {
            pasos.push(`Expresión original: ${expresion}`);

            const resolverParentesis = (exp) => {
                const regex = /\(([^()]+)\)/;
                while (regex.test(exp)) {
                    exp = exp.replace(regex, (match, p1) => {
                        const resultado = eval(p1);
                        pasos.push(`Resolviendo: ${p1} = ${resultado}`);
                        
                        return resultado;
                    });
                }
                return exp;
            };

            const expresionSinParentesis = resolverParentesis(expresion);
            pasos.push(`Después de resolver paréntesis: ${expresionSinParentesis}`);

            const partes = expresionSinParentesis.split(/([\+\-\*\/])/).map(part => part.trim());
            partes.forEach((parte, indice) => {
                if (parte.includes('**')) {
                    const [base, exp] = parte.split('**').map(Number);
                    const resultado = Math.pow(base, exp);
                    pasos.push(`Resolviendo: ${parte} = ${resultado}`);
                    
                    partes[indice] = resultado;
                }
            });

            const expresionConExponentes = partes.join(' ');
            pasos.push(`Después de resolver exponentes: ${expresionConExponentes}`);

            const resultado = eval(expresionConExponentes);
            pasos.push(`Tu resultado: ${resultado}`);

            mostrarPasos(pasos);
        } catch (error) {
            pasos.push(`Error al calcular: ${error.message}`);
            mostrarPasos(pasos);
        }
    };

    document.getElementById('calcular').addEventListener('click', calcular);

// 20/(10*1)
// 24+((10+2)*2)