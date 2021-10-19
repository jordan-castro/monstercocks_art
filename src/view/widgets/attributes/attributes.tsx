import Attribute from '../../../models/attribute';

function AttributeWidget(props: { attribute?: Attribute }) {
    const { attribute } = props;

    return (
        <div className="attribute">
            {
                attribute !== undefined ?
                    <>
                        <span>{attribute.type}</span>
                        <span>{attribute.value}</span>
                    </>
                    : null
            }
        </div>
    );
}

export default function AttributesWidget(props: { attributes?: Attribute[] }) {
    const { attributes } = props;

    return (
        <div className="attributes">
            {
                attributes !== undefined
                    ? attributes.map((attribute) => <AttributeWidget
                        attribute={attribute}
                        key={attribute.type}
                    />)
                    : null
            }
        </div>
    );
}